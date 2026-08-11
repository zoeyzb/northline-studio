"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneName = "hero" | "services" | "case" | "transition" | "project" | "cta";
type Formation = "depth" | "lanes" | "column" | "tunnel" | "frame" | "mark";

const FORMATIONS: Formation[] = ["depth", "lanes", "column", "tunnel", "frame", "mark"];

type SceneTarget = {
  formation: Formation;
  color: THREE.Color;
  secondary: THREE.Color;
  opacity: number;
  spread: number;
  depth: number;
  rotation: number;
};

const vertexShader = `
  uniform float uSize;
  attribute float aScale;
  varying float vScale;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float perspective = 250.0 / max(1.0, -mvPosition.z);
    gl_PointSize = uSize * aScale * perspective;
    gl_Position = projectionMatrix * mvPosition;
    vScale = aScale;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vScale;
  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p);
    float core = 1.0 - smoothstep(0.0, 0.16, d);
    float halo = 1.0 - smoothstep(0.06, 0.5, d);
    float alpha = (core * 0.9 + halo * 0.42) * uOpacity;
    if (alpha < 0.01) discard;
    vec3 color = uColor * (1.35 + core * 1.7 + vScale * 0.12);
    gl_FragColor = vec4(color, alpha);
  }
`;

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function makeBase(count: number, radius: number, depth: number, salt: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const theta = seeded(i, salt) * Math.PI * 2;
    const radial = radius * (.12 + seeded(i, salt + 1) * .88);
    positions[i * 3] = Math.cos(theta) * radial;
    positions[i * 3 + 1] = (seeded(i, salt + 2) - .5) * radius * .9;
    positions[i * 3 + 2] = 3 - seeded(i, salt + 3) * depth;
    scales[i] = .55 + seeded(i, salt + 4) * 1.7;
  }
  return { positions, scales };
}

function makeFormation(base: Float32Array, name: Formation, radius: number) {
  const out = new Float32Array(base.length);
  const count = base.length / 3;
  for (let i = 0; i < count; i += 1) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    const t = count > 1 ? i / (count - 1) : 0;

    if (name === "depth") {
      out[i * 3] = x;
      out[i * 3 + 1] = y;
      out[i * 3 + 2] = z;
    } else if (name === "lanes") {
      const lane = (i % 3) - 1;
      out[i * 3] = lane * radius * .42 + (seeded(i, 21) - .5) * 1.2;
      out[i * 3 + 1] = (seeded(i, 22) - .5) * radius * 1.15;
      out[i * 3 + 2] = 2 - t * 28;
    } else if (name === "column") {
      const angle = t * Math.PI * 18 + seeded(i, 23) * .8;
      const r = radius * (.16 + seeded(i, 24) * .22);
      out[i * 3] = Math.cos(angle) * r;
      out[i * 3 + 1] = (t - .5) * radius * 1.5;
      out[i * 3 + 2] = -2 - Math.sin(angle) * 2.1 - seeded(i, 25) * 8;
    } else if (name === "tunnel") {
      const angle = seeded(i, 26) * Math.PI * 2;
      const r = radius * (.34 + seeded(i, 27) * .38);
      out[i * 3] = Math.cos(angle) * r;
      out[i * 3 + 1] = Math.sin(angle) * r * .64;
      out[i * 3 + 2] = 5 - t * 34;
    } else if (name === "frame") {
      const edge = i % 4;
      const q = seeded(i, 28);
      const w = radius * .72;
      const h = radius * .43;
      if (edge === 0) { out[i * 3] = -w + q * w * 2; out[i * 3 + 1] = h; }
      if (edge === 1) { out[i * 3] = w; out[i * 3 + 1] = h - q * h * 2; }
      if (edge === 2) { out[i * 3] = w - q * w * 2; out[i * 3 + 1] = -h; }
      if (edge === 3) { out[i * 3] = -w; out[i * 3 + 1] = -h + q * h * 2; }
      out[i * 3 + 2] = -4 - seeded(i, 29) * 6;
    } else {
      const third = t * 3;
      if (third < 1) {
        out[i * 3] = -radius * .28 + (seeded(i, 31) - .5) * .45;
        out[i * 3 + 1] = radius * .48 - third * radius * .96;
      } else if (third < 2) {
        const p = third - 1;
        out[i * 3] = -radius * .28 + p * radius * .56 + (seeded(i, 32) - .5) * .35;
        out[i * 3 + 1] = radius * .48 - p * radius * .96 + (seeded(i, 33) - .5) * .35;
      } else {
        const p = third - 2;
        out[i * 3] = radius * .28 + (seeded(i, 34) - .5) * .45;
        out[i * 3 + 1] = -radius * .48 + p * radius * .96;
      }
      out[i * 3 + 2] = -3.6 + (seeded(i, 35) - .5) * 1.5;
    }
  }
  return out;
}

function SpatialWorld({ compact }: { compact: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const deepPoints = useRef<THREE.Points>(null);
  const nearPoints = useRef<THREE.Points>(null);
  const sparklePoints = useRef<THREE.Points>(null);
  const deepMaterial = useRef<THREE.ShaderMaterial>(null);
  const nearMaterial = useRef<THREE.ShaderMaterial>(null);
  const sparkleMaterial = useRef<THREE.ShaderMaterial>(null);
  const objectRig = useRef<THREE.Group>(null);
  const panelA = useRef<THREE.Mesh>(null);
  const panelB = useRef<THREE.Mesh>(null);
  const panelC = useRef<THREE.Mesh>(null);
  const panelD = useRef<THREE.Mesh>(null);
  const input = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const active = useRef(true);
  const caseStep = useRef(0);
  const target = useRef<SceneTarget>({
    formation: "depth",
    color: new THREE.Color("#83e7ff"),
    secondary: new THREE.Color("#8e72ff"),
    opacity: .92,
    spread: 1,
    depth: 0,
    rotation: 0,
  });

  const deep = useMemo(() => makeBase(compact ? 420 : 1050, 17, 38, 7), [compact]);
  const near = useMemo(() => makeBase(compact ? 260 : 680, 10, 22, 17), [compact]);
  const sparkles = useMemo(() => makeBase(compact ? 70 : 150, 8, 17, 41), [compact]);
  const deepForms = useMemo(() => Object.fromEntries(FORMATIONS.map((name) => [name, makeFormation(deep.positions, name, 17)])) as Record<Formation, Float32Array>, [deep.positions]);
  const nearForms = useMemo(() => Object.fromEntries(FORMATIONS.map((name) => [name, makeFormation(near.positions, name, 10)])) as Record<Formation, Float32Array>, [near.positions]);
  const sparkleForms = useMemo(() => Object.fromEntries(FORMATIONS.map((name) => [name, makeFormation(sparkles.positions, name, 8)])) as Record<Formation, Float32Array>, [sparkles.positions]);

  const primaryLine = useMemo(() => [
    new THREE.Vector3(-5, -1.7, -2), new THREE.Vector3(-2.3, .4, -3.2), new THREE.Vector3(.4, -.35, -4.4), new THREE.Vector3(3.1, .9, -5.8), new THREE.Vector3(5.2, -.4, -7),
  ], []);
  const secondaryLine = useMemo(() => [
    new THREE.Vector3(-4.4, 2.2, -6), new THREE.Vector3(-1.7, 1.1, -7), new THREE.Vector3(1.4, 2.1, -8.3), new THREE.Vector3(4.4, .8, -9.2),
  ], []);

  useEffect(() => {
    const updatePointer = (x: number, y: number) => {
      input.current.x = x / window.innerWidth * 2 - 1;
      input.current.y = -(y / window.innerHeight) * 2 + 1;
    };
    const onPointer = (event: PointerEvent) => updatePointer(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const point = event.touches[0];
      if (point) updatePointer(point.clientX, point.clientY);
    };
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scroll.current = window.scrollY / max;
    };
    const scenes: Record<SceneName, { formation: Formation; color: string; secondary: string; opacity: number; spread: number; depth: number; rotation: number }> = {
      hero: { formation: "depth", color: "#8cecff", secondary: "#a287ff", opacity: 1, spread: 1, depth: 0, rotation: 0 },
      services: { formation: "lanes", color: "#8de8fb", secondary: "#a792ff", opacity: .9, spread: 1.04, depth: 1.1, rotation: .08 },
      case: { formation: "column", color: "#b7a7ff", secondary: "#73dff4", opacity: .92, spread: .94, depth: 2, rotation: .15 },
      transition: { formation: "tunnel", color: "#e4fbff", secondary: "#81dff4", opacity: 1, spread: 1.12, depth: 3.1, rotation: .3 },
      project: { formation: "frame", color: "#91efd0", secondary: "#8da6ff", opacity: .86, spread: 1, depth: 3.8, rotation: -.08 },
      cta: { formation: "mark", color: "#efffff", secondary: "#ad98ff", opacity: 1, spread: .86, depth: 4.6, rotation: 0 },
    };
    const onScene = (event: Event) => {
      const name = (event as CustomEvent<{ scene: SceneName }>).detail.scene;
      const scene = scenes[name];
      if (!scene) return;
      target.current = { ...scene, color: new THREE.Color(scene.color), secondary: new THREE.Color(scene.secondary) };
    };
    const onCaseStep = (event: Event) => { caseStep.current = (event as CustomEvent<{ step: number }>).detail.step; };
    const onVisibility = () => { active.current = !document.hidden; };

    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("northline:scene", onScene);
    window.addEventListener("northline:case-step", onCaseStep);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("northline:scene", onScene);
      window.removeEventListener("northline:case-step", onCaseStep);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useFrame((state, delta) => {
    if (!active.current || !rig.current || !deepPoints.current || !nearPoints.current || !sparklePoints.current || !objectRig.current) return;
    const next = target.current;
    const morph = 1 - Math.pow(.0017, Math.min(delta, .033));
    const { x, y } = input.current;
    const page = scroll.current;

    const morphPoints = (points: THREE.Points, formation: Float32Array) => {
      const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
      const values = attr.array as Float32Array;
      for (let i = 0; i < values.length; i += 1) values[i] += (formation[i] - values[i]) * morph;
      attr.needsUpdate = true;
    };
    morphPoints(deepPoints.current, deepForms[next.formation]);
    morphPoints(nearPoints.current, nearForms[next.formation]);
    morphPoints(sparklePoints.current, sparkleForms[next.formation]);

    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .18 + next.rotation, 2.5, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .09, 2.8, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .5, 2.6, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .28 + page * 1.2, 2.3, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, next.depth + page * 1.7, 2.15, delta);
    rig.current.scale.x = THREE.MathUtils.damp(rig.current.scale.x, next.spread, 2.2, delta);
    rig.current.scale.y = THREE.MathUtils.damp(rig.current.scale.y, next.spread, 2.2, delta);

    [nearMaterial.current, sparkleMaterial.current].forEach((material, index) => {
      if (!material) return;
      (material.uniforms.uColor.value as THREE.Color).lerp(next.color, Math.min(delta * (index ? 4.2 : 3.2), 1));
      material.uniforms.uOpacity.value = THREE.MathUtils.damp(material.uniforms.uOpacity.value as number, next.opacity * (index ? .95 : .75), 2.7, delta);
    });
    if (deepMaterial.current) {
      (deepMaterial.current.uniforms.uColor.value as THREE.Color).lerp(next.secondary, Math.min(delta * 2.2, 1));
      deepMaterial.current.uniforms.uOpacity.value = THREE.MathUtils.damp(deepMaterial.current.uniforms.uOpacity.value as number, next.opacity * .42, 2.3, delta);
    }

    nearPoints.current.rotation.z += delta * .01;
    deepPoints.current.rotation.z -= delta * .003;
    sparklePoints.current.rotation.y += delta * .008;

    const isCase = next.formation === "column";
    const isTransition = next.formation === "tunnel";
    const isProject = next.formation === "frame";
    const isCta = next.formation === "mark";
    objectRig.current.visible = isCase || isTransition || isProject || isCta;
    objectRig.current.rotation.y = THREE.MathUtils.damp(objectRig.current.rotation.y, isTransition ? state.clock.elapsedTime * .18 : x * .18 + caseStep.current * .18, 2.1, delta);
    objectRig.current.rotation.x = THREE.MathUtils.damp(objectRig.current.rotation.x, y * -.08 + (isProject ? -.12 : 0), 2.3, delta);
    objectRig.current.scale.setScalar(THREE.MathUtils.damp(objectRig.current.scale.x, isCta ? .58 : isTransition ? 1.5 : isProject ? 1.12 : 1, 2.2, delta));

    const panels = [panelA.current, panelB.current, panelC.current, panelD.current];
    const caseLayouts = [
      [[-2.4, 1.1, -1.2], [1.9, .8, -2.4], [-1.6, -1.25, -3], [2.2, -1.1, -4]],
      [[-1.8, 1.15, -.8], [1.8, 1.15, -1.3], [-1.8, -1.15, -1.8], [1.8, -1.15, -2.3]],
      [[-2.1, .8, .2], [0, 1.05, -.6], [2.1, .8, -1.2], [0, -1.25, -1.8]],
      [[-1.7, .75, .5], [1.7, .75, .3], [-1.7, -.9, .1], [1.7, -.9, -.1]],
    ];
    const projectLayout = [[-2, .85, 0], [0, .85, -.2], [2, .85, -.4], [0, -1, -.6]];
    const ctaLayout = [[-.9, .6, 0], [.9, .6, 0], [-.9, -.6, 0], [.9, -.6, 0]];
    const transitionLayout = [[-3, 1.5, 1], [3, 1.5, 0], [-3, -1.5, -1], [3, -1.5, -2]];
    panels.forEach((panel, index) => {
      if (!panel) return;
      const layout = isCase ? caseLayouts[Math.min(caseStep.current, 3)][index] : isProject ? projectLayout[index] : isCta ? ctaLayout[index] : transitionLayout[index];
      panel.position.x = THREE.MathUtils.damp(panel.position.x, layout[0], 3, delta);
      panel.position.y = THREE.MathUtils.damp(panel.position.y, layout[1], 3, delta);
      panel.position.z = THREE.MathUtils.damp(panel.position.z, layout[2], 3, delta);
      panel.rotation.z = THREE.MathUtils.damp(panel.rotation.z, isTransition ? (index - 1.5) * .22 : isCase ? (caseStep.current - 1.5) * .035 * (index % 2 ? 1 : -1) : 0, 2.6, delta);
    });
  });

  return (
    <group ref={rig}>
      <Points ref={deepPoints} positions={deep.positions} stride={3} frustumCulled={false}>
        <bufferAttribute attach="geometry-attributes-aScale" args={[deep.scales, 1]} />
        <shaderMaterial ref={deepMaterial} uniforms={{ uSize: { value: compact ? 10 : 13 }, uColor: { value: new THREE.Color("#8e72ff") }, uOpacity: { value: .36 } }} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
      <Points ref={nearPoints} positions={near.positions} stride={3} frustumCulled={false}>
        <bufferAttribute attach="geometry-attributes-aScale" args={[near.scales, 1]} />
        <shaderMaterial ref={nearMaterial} uniforms={{ uSize: { value: compact ? 18 : 24 }, uColor: { value: new THREE.Color("#83e7ff") }, uOpacity: { value: .78 } }} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
      <Points ref={sparklePoints} positions={sparkles.positions} stride={3} frustumCulled={false}>
        <bufferAttribute attach="geometry-attributes-aScale" args={[sparkles.scales, 1]} />
        <shaderMaterial ref={sparkleMaterial} uniforms={{ uSize: { value: compact ? 28 : 40 }, uColor: { value: new THREE.Color("#d9fbff") }, uOpacity: { value: .92 } }} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>

      <group position={[0, 0, -5]}>
        <Line points={primaryLine} color="#78dff5" transparent opacity={.14} lineWidth={.5} />
        <Line points={secondaryLine} color="#a590ff" transparent opacity={.1} lineWidth={.45} />
      </group>

      <Float speed={.55} rotationIntensity={.08} floatIntensity={.16}>
        <group ref={objectRig} position={[0, 0, -4.2]} visible={false}>
          <mesh ref={panelA}><boxGeometry args={[2.8, 1.7, .07]} /><meshBasicMaterial color="#86e7f8" wireframe transparent opacity={.18} /></mesh>
          <mesh ref={panelB}><boxGeometry args={[2.8, 1.7, .07]} /><meshBasicMaterial color="#a894ff" wireframe transparent opacity={.17} /></mesh>
          <mesh ref={panelC}><boxGeometry args={[2.8, 1.7, .07]} /><meshBasicMaterial color="#88e7ca" wireframe transparent opacity={.16} /></mesh>
          <mesh ref={panelD}><boxGeometry args={[2.8, 1.7, .07]} /><meshBasicMaterial color="#ff9d87" wireframe transparent opacity={.13} /></mesh>
          <mesh rotation={[.7, .25, 0]}><torusGeometry args={[3.5, .018, 12, 100]} /><meshBasicMaterial color="#c6f5ff" transparent opacity={.13} /></mesh>
          <mesh rotation={[1.2, .5, .4]}><torusGeometry args={[4.1, .012, 12, 100]} /><meshBasicMaterial color="#b4a3ff" transparent opacity={.09} /></mesh>
        </group>
      </Float>
    </group>
  );
}

export function AtmosphericScene() {
  const compact = typeof window !== "undefined" && window.matchMedia("(max-width:760px)").matches;
  return (
    <div className="spatial-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={compact ? 1 : [1, 1.35]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <fog attach="fog" args={["#02060b", 9, 38]} />
        <SpatialWorld compact={compact} />
      </Canvas>
    </div>
  );
}
