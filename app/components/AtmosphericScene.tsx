"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneName = "overview" | "trust" | "system" | "services" | "proof" | "standards" | "contact";
type FormationName = "drift" | "ring" | "column" | "lattice" | "stream" | "constellation" | "bloom";

type SceneTarget = {
  formation: FormationName;
  color: THREE.Color;
  secondary: THREE.Color;
  opacity: number;
  depth: number;
  spread: number;
  rotation: number;
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function makeBase(count: number, radius: number, depth: number, salt: number) {
  const values = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const theta = seeded(i, salt) * Math.PI * 2;
    const radial = radius * (.14 + seeded(i, salt + 1) * .86);
    values[i * 3] = Math.cos(theta) * radial;
    values[i * 3 + 1] = (seeded(i, salt + 2) - .5) * radius * .8;
    values[i * 3 + 2] = 2.5 - seeded(i, salt + 3) * depth;
  }
  return values;
}

function makeFormation(base: Float32Array, name: FormationName, radius: number) {
  const next = new Float32Array(base.length);
  const count = base.length / 3;
  for (let i = 0; i < count; i += 1) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    const t = count > 1 ? i / (count - 1) : 0;
    const angle = t * Math.PI * 14 + seeded(i, 51) * .55;

    if (name === "drift") {
      next[i * 3] = x;
      next[i * 3 + 1] = y;
      next[i * 3 + 2] = z;
    } else if (name === "ring") {
      const r = radius * (.42 + seeded(i, 52) * .28);
      next[i * 3] = Math.cos(angle) * r;
      next[i * 3 + 1] = Math.sin(angle) * r * .46;
      next[i * 3 + 2] = -4.5 + (seeded(i, 53) - .5) * 3.4;
    } else if (name === "column") {
      const lane = (i % 5) - 2;
      next[i * 3] = lane * radius * .12 + (seeded(i, 54) - .5) * .5;
      next[i * 3 + 1] = (t - .5) * radius * 1.45;
      next[i * 3 + 2] = -2 - seeded(i, 55) * 13;
    } else if (name === "lattice") {
      const side = Math.ceil(Math.sqrt(count));
      const gx = i % side;
      const gy = Math.floor(i / side);
      const spacing = radius * 1.45 / Math.max(side - 1, 1);
      next[i * 3] = (gx - side / 2) * spacing;
      next[i * 3 + 1] = (gy - side / 2) * spacing * .72;
      next[i * 3 + 2] = -3.2 - (i % 7) * .48;
    } else if (name === "stream") {
      next[i * 3] = (seeded(i, 56) - .5) * radius * .45 + Math.sin(t * Math.PI * 6) * 1.1;
      next[i * 3 + 1] = (seeded(i, 57) - .5) * radius * .33;
      next[i * 3 + 2] = 2 - t * 24;
    } else if (name === "constellation") {
      const cluster = i % 6;
      const cx = Math.cos(cluster / 6 * Math.PI * 2) * radius * .48;
      const cy = Math.sin(cluster / 6 * Math.PI * 2) * radius * .25;
      next[i * 3] = cx + (seeded(i, 58) - .5) * radius * .24;
      next[i * 3 + 1] = cy + (seeded(i, 59) - .5) * radius * .18;
      next[i * 3 + 2] = -3 - cluster * 1.1 - seeded(i, 60) * 2;
    } else {
      const push = 1.35 + seeded(i, 61) * .75;
      next[i * 3] = x * push;
      next[i * 3 + 1] = y * push;
      next[i * 3 + 2] = z * .72 - 2;
    }
  }
  return next;
}

function SpatialWorld({ compact }: { compact: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const deepField = useRef<THREE.Points>(null);
  const nearField = useRef<THREE.Points>(null);
  const dustField = useRef<THREE.Points>(null);
  const architecture = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const deepMaterial = useRef<THREE.PointsMaterial>(null);
  const nearMaterial = useRef<THREE.PointsMaterial>(null);
  const dustMaterial = useRef<THREE.PointsMaterial>(null);
  const input = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const active = useRef(true);
  const target = useRef<SceneTarget>({
    formation: "drift",
    color: new THREE.Color("#72d9f2"),
    secondary: new THREE.Color("#2e749a"),
    opacity: .82,
    depth: 0,
    spread: 1,
    rotation: 0,
  });

  const deepBase = useMemo(() => makeBase(compact ? 360 : 900, 16, 34, 7), [compact]);
  const nearBase = useMemo(() => makeBase(compact ? 240 : 620, 9, 19, 13), [compact]);
  const dustBase = useMemo(() => makeBase(compact ? 150 : 380, 5, 12, 29), [compact]);

  const deepFormations = useMemo(() => Object.fromEntries((["drift", "ring", "column", "lattice", "stream", "constellation", "bloom"] as FormationName[]).map((name) => [name, makeFormation(deepBase, name, 16)])) as Record<FormationName, Float32Array>, [deepBase]);
  const nearFormations = useMemo(() => Object.fromEntries((["drift", "ring", "column", "lattice", "stream", "constellation", "bloom"] as FormationName[]).map((name) => [name, makeFormation(nearBase, name, 9)])) as Record<FormationName, Float32Array>, [nearBase]);
  const dustFormations = useMemo(() => Object.fromEntries((["drift", "ring", "column", "lattice", "stream", "constellation", "bloom"] as FormationName[]).map((name) => [name, makeFormation(dustBase, name, 5)])) as Record<FormationName, Float32Array>, [dustBase]);

  const pathPrimary = useMemo(() => [
    new THREE.Vector3(-5.2, -1.8, -.8),
    new THREE.Vector3(-2.8, .35, -1.9),
    new THREE.Vector3(-.4, -.35, -3.1),
    new THREE.Vector3(2.2, .8, -4.2),
    new THREE.Vector3(5.4, -.4, -5.4),
  ], []);
  const pathSecondary = useMemo(() => [
    new THREE.Vector3(-4.6, 2.1, -4.8),
    new THREE.Vector3(-1.8, 1.1, -5.7),
    new THREE.Vector3(1.3, 2.2, -6.8),
    new THREE.Vector3(4.4, .9, -8),
  ], []);

  useEffect(() => {
    const updateInput = (x: number, y: number) => {
      input.current.x = x / window.innerWidth * 2 - 1;
      input.current.y = -(y / window.innerHeight) * 2 + 1;
    };
    const updateScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scroll.current = window.scrollY / max;
    };
    const onPointer = (event: PointerEvent) => updateInput(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const point = event.touches[0];
      if (point) updateInput(point.clientX, point.clientY);
    };

    const scenes: Record<SceneName, Omit<SceneTarget, "color" | "secondary"> & { color: string; secondary: string }> = {
      overview: { formation: "drift", color: "#8be9ff", secondary: "#2e749a", opacity: .92, depth: 0, spread: 1, rotation: 0 },
      trust: { formation: "ring", color: "#b9f4ff", secondary: "#44788f", opacity: .66, depth: .5, spread: .94, rotation: .12 },
      system: { formation: "column", color: "#78e6ff", secondary: "#315e8f", opacity: .86, depth: 1.2, spread: 1.05, rotation: .2 },
      services: { formation: "lattice", color: "#9eefff", secondary: "#436c9c", opacity: .78, depth: 2.1, spread: 1.08, rotation: -.12 },
      proof: { formation: "stream", color: "#d7fbff", secondary: "#4a8298", opacity: .9, depth: 3.1, spread: .9, rotation: .08 },
      standards: { formation: "constellation", color: "#99e7f6", secondary: "#40647e", opacity: .68, depth: 4.2, spread: 1.13, rotation: -.18 },
      contact: { formation: "bloom", color: "#effeff", secondary: "#62b6d2", opacity: .95, depth: 5.2, spread: .7, rotation: .34 },
    };

    const onScene = (event: Event) => {
      const sceneName = (event as CustomEvent<{ scene: SceneName }>).detail.scene;
      const scene = scenes[sceneName];
      if (!scene) return;
      target.current = { ...scene, color: new THREE.Color(scene.color), secondary: new THREE.Color(scene.secondary) };
    };
    const onVisibility = () => { active.current = !document.hidden; };

    updateScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("northline:scene", onScene);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("northline:scene", onScene);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useFrame((state, delta) => {
    if (!active.current || !rig.current || !deepField.current || !nearField.current || !dustField.current || !architecture.current || !core.current) return;
    const { x, y } = input.current;
    const page = scroll.current;
    const next = target.current;
    const morph = 1 - Math.pow(.0015, Math.min(delta, .033));

    const morphField = (points: THREE.Points, formation: Float32Array) => {
      const attribute = points.geometry.getAttribute("position") as THREE.BufferAttribute;
      const values = attribute.array as Float32Array;
      for (let i = 0; i < values.length; i += 1) values[i] += (formation[i] - values[i]) * morph;
      attribute.needsUpdate = true;
    };
    morphField(deepField.current, deepFormations[next.formation]);
    morphField(nearField.current, nearFormations[next.formation]);
    morphField(dustField.current, dustFormations[next.formation]);

    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .2 + next.rotation, 2.6, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .11, 2.9, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .58, 2.7, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .34 + page * 1.7, 2.35, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, next.depth + page * 1.55, 2.15, delta);
    rig.current.scale.x = THREE.MathUtils.damp(rig.current.scale.x, next.spread, 2.2, delta);
    rig.current.scale.y = THREE.MathUtils.damp(rig.current.scale.y, next.spread, 2.2, delta);
    rig.current.scale.z = THREE.MathUtils.damp(rig.current.scale.z, 1 + next.depth * .026, 2.2, delta);

    if (nearMaterial.current && deepMaterial.current && dustMaterial.current) {
      nearMaterial.current.color.lerp(next.color, Math.min(delta * 2.8, 1));
      nearMaterial.current.opacity = THREE.MathUtils.damp(nearMaterial.current.opacity, next.opacity, 2.6, delta);
      deepMaterial.current.color.lerp(next.secondary, Math.min(delta * 1.8, 1));
      deepMaterial.current.opacity = THREE.MathUtils.damp(deepMaterial.current.opacity, next.opacity * .38, 2, delta);
      dustMaterial.current.color.lerp(next.color, Math.min(delta * 2.1, 1));
      dustMaterial.current.opacity = THREE.MathUtils.damp(dustMaterial.current.opacity, next.opacity * .28, 2.1, delta);
    }

    nearField.current.rotation.z += delta * .009;
    deepField.current.rotation.z -= delta * .0025;
    dustField.current.rotation.y += delta * .0045;
    architecture.current.rotation.z = THREE.MathUtils.damp(architecture.current.rotation.z, next.rotation * .38, 2.1, delta);
    architecture.current.position.x = THREE.MathUtils.damp(architecture.current.position.x, x * .34, 2.3, delta);
    core.current.rotation.x += delta * .022;
    core.current.rotation.y -= delta * .03;
    core.current.position.y = Math.sin(state.clock.elapsedTime * .36) * .1;
  });

  return (
    <group ref={rig}>
      <Points ref={deepField} positions={deepBase} stride={3} frustumCulled={false}>
        <PointMaterial ref={deepMaterial} transparent color="#2e749a" size={.024} sizeAttenuation depthWrite={false} opacity={.25} />
      </Points>
      <Points ref={nearField} positions={nearBase} stride={3} frustumCulled={false}>
        <PointMaterial ref={nearMaterial} transparent color="#72d9f2" size={.044} sizeAttenuation depthWrite={false} opacity={.82} />
      </Points>
      <Points ref={dustField} positions={dustBase} stride={3} frustumCulled={false}>
        <PointMaterial ref={dustMaterial} transparent color="#d2f6ff" size={.07} sizeAttenuation depthWrite={false} opacity={.18} />
      </Points>

      <group ref={architecture}>
        <Line points={pathPrimary} color="#72d9f2" transparent opacity={.18} lineWidth={.45} />
        <Line points={pathSecondary} color="#4a7898" transparent opacity={.12} lineWidth={.4} />
        {pathPrimary.map((point, index) => (
          <mesh key={`node-${index}`} position={point}>
            <sphereGeometry args={[index === 2 ? .055 : .035, 12, 12]} />
            <meshBasicMaterial color={index === 2 ? "#dffaff" : "#72d9f2"} transparent opacity={index === 2 ? .8 : .38} />
          </mesh>
        ))}
        <mesh rotation={[1.25, .08, .15]} position={[1.1, -.2, -5.2]}>
          <torusGeometry args={[3.6, .008, 8, 110]} />
          <meshBasicMaterial color="#72d9f2" transparent opacity={.1} />
        </mesh>
        <mesh rotation={[1.05, -.18, -.35]} position={[-1.2, .55, -7.1]}>
          <torusGeometry args={[5.4, .006, 8, 120]} />
          <meshBasicMaterial color="#7fa8c7" transparent opacity={.07} />
        </mesh>
      </group>

      <Float speed={.42} rotationIntensity={.12} floatIntensity={.2}>
        <group ref={core} position={[0, 0, -4.8]}>
          <mesh>
            <icosahedronGeometry args={[.82, 1]} />
            <meshBasicMaterial color="#72d9f2" wireframe transparent opacity={.13} />
          </mesh>
          <mesh rotation={[.7, .3, 0]}>
            <torusGeometry args={[1.18, .015, 12, 90]} />
            <meshBasicMaterial color="#d2f6ff" transparent opacity={.1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export function AtmosphericScene() {
  const compact = typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;
  return (
    <div className="spatial-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={compact ? 1 : [1, 1.3]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <fog attach="fog" args={["#02060b", 8, 34]} />
        <SpatialWorld compact={compact} />
      </Canvas>
    </div>
  );
}
