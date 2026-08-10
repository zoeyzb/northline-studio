"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneTarget = {
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
    color: new THREE.Color("#72d9f2"),
    secondary: new THREE.Color("#2e749a"),
    opacity: .82,
    depth: 0,
    spread: 1,
    rotation: 0,
  });

  const makeField = (count: number, radius: number, depth: number, salt: number) => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const theta = seeded(i, salt) * Math.PI * 2;
      const radial = radius * (.16 + seeded(i, salt + 1) * .84);
      const vertical = (seeded(i, salt + 2) - .5) * radius * .78;
      values[i * 3] = Math.cos(theta) * radial;
      values[i * 3 + 1] = vertical;
      values[i * 3 + 2] = 2.2 - seeded(i, salt + 3) * depth;
    }
    return values;
  };

  const deepPositions = useMemo(() => makeField(compact ? 420 : 1100, 15, 30, 7), [compact]);
  const nearPositions = useMemo(() => makeField(compact ? 260 : 720, 8, 16, 13), [compact]);
  const dustPositions = useMemo(() => makeField(compact ? 190 : 500, 4.5, 10, 29), [compact]);

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

    const scenes: Record<string, Omit<SceneTarget, "color" | "secondary"> & { color: string; secondary: string }> = {
      overview: { color: "#7de3fa", secondary: "#2e749a", opacity: .88, depth: 0, spread: 1, rotation: 0 },
      trust: { color: "#96eafb", secondary: "#356f8c", opacity: .56, depth: .55, spread: .94, rotation: .08 },
      system: { color: "#67ddf7", secondary: "#285e89", opacity: .82, depth: 1.45, spread: 1.2, rotation: .25 },
      services: { color: "#83d9f2", secondary: "#375b91", opacity: .72, depth: 2.3, spread: 1.08, rotation: -.14 },
      proof: { color: "#b9effa", secondary: "#3f7f9e", opacity: .8, depth: 3.25, spread: .86, rotation: .2 },
      standards: { color: "#92e1f2", secondary: "#315a78", opacity: .5, depth: 4.1, spread: 1.24, rotation: -.22 },
      contact: { color: "#e0fbff", secondary: "#4a9fc0", opacity: .9, depth: 5.35, spread: .66, rotation: .36 },
    };

    const onScene = (event: Event) => {
      const scene = scenes[(event as CustomEvent<{ scene: string }>).detail.scene];
      if (!scene) return;
      target.current = {
        ...scene,
        color: new THREE.Color(scene.color),
        secondary: new THREE.Color(scene.secondary),
      };
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

  useFrame((_state, delta) => {
    if (!active.current || !rig.current || !deepField.current || !nearField.current || !dustField.current || !architecture.current || !core.current) return;
    const { x, y } = input.current;
    const page = scroll.current;
    const next = target.current;

    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .17 + next.rotation, 2.6, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .09, 2.9, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .52, 2.7, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .3 + page * 1.55, 2.35, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, next.depth + page * 1.45, 2.15, delta);
    rig.current.scale.x = THREE.MathUtils.damp(rig.current.scale.x, next.spread, 2.2, delta);
    rig.current.scale.y = THREE.MathUtils.damp(rig.current.scale.y, next.spread, 2.2, delta);
    rig.current.scale.z = THREE.MathUtils.damp(rig.current.scale.z, 1 + next.depth * .024, 2.2, delta);

    if (nearMaterial.current && deepMaterial.current && dustMaterial.current) {
      nearMaterial.current.color.lerp(next.color, Math.min(delta * 2.4, 1));
      nearMaterial.current.opacity = THREE.MathUtils.damp(nearMaterial.current.opacity, next.opacity, 2.4, delta);
      deepMaterial.current.color.lerp(next.secondary, Math.min(delta * 1.6, 1));
      deepMaterial.current.opacity = THREE.MathUtils.damp(deepMaterial.current.opacity, next.opacity * .36, 1.9, delta);
      dustMaterial.current.color.lerp(next.color, Math.min(delta * 2, 1));
      dustMaterial.current.opacity = THREE.MathUtils.damp(dustMaterial.current.opacity, next.opacity * .24, 2, delta);
    }

    nearField.current.rotation.z += delta * .0075;
    nearField.current.rotation.x += delta * .0015;
    deepField.current.rotation.z -= delta * .002;
    dustField.current.rotation.y += delta * .004;
    architecture.current.rotation.z = THREE.MathUtils.damp(architecture.current.rotation.z, next.rotation * .34, 2.1, delta);
    architecture.current.position.x = THREE.MathUtils.damp(architecture.current.position.x, x * .28, 2.3, delta);
    core.current.rotation.x += delta * .018;
    core.current.rotation.y -= delta * .025;
    core.current.position.y = Math.sin(_state.clock.elapsedTime * .32) * .08;
  });

  return (
    <group ref={rig}>
      <Points ref={deepField} positions={deepPositions} stride={3} frustumCulled>
        <PointMaterial ref={deepMaterial} transparent color="#2e749a" size={.02} sizeAttenuation depthWrite={false} opacity={.24} />
      </Points>
      <Points ref={nearField} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial ref={nearMaterial} transparent color="#72d9f2" size={.038} sizeAttenuation depthWrite={false} opacity={.78} />
      </Points>
      <Points ref={dustField} positions={dustPositions} stride={3} frustumCulled>
        <PointMaterial ref={dustMaterial} transparent color="#d2f6ff" size={.062} sizeAttenuation depthWrite={false} opacity={.16} />
      </Points>

      <group ref={architecture}>
        <Line points={pathPrimary} color="#83dff4" lineWidth={.72} transparent opacity={.42} />
        <Line points={pathSecondary} color="#477d9f" lineWidth={.45} transparent opacity={.22} />
        {pathPrimary.map((point, index) => (
          <Float key={`primary-${index}`} speed={.58 + index * .09} rotationIntensity={.1} floatIntensity={.3}>
            <mesh position={point}>
              <sphereGeometry args={[index === pathPrimary.length - 1 ? .12 : .07, 14, 14]} />
              <meshBasicMaterial color={index === pathPrimary.length - 1 ? "#dffbff" : "#73cce7"} transparent opacity={.84} />
            </mesh>
          </Float>
        ))}
        {pathSecondary.map((point, index) => (
          <mesh position={point} key={`secondary-${index}`}>
            <octahedronGeometry args={[.05, 0]} />
            <meshBasicMaterial color="#6caac5" transparent opacity={.5} />
          </mesh>
        ))}
      </group>

      <group ref={core} position={[3.7, .4, -2.8]}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#59b7d8" wireframe transparent opacity={.16} />
        </mesh>
        <mesh rotation={[.4, .1, .7]}>
          <torusGeometry args={[1.72, .012, 8, 100]} />
          <meshBasicMaterial color="#c4eff8" transparent opacity={.32} />
        </mesh>
        <mesh rotation={[-.65, .35, -.2]}>
          <torusGeometry args={[2.18, .008, 8, 100]} />
          <meshBasicMaterial color="#65b7d5" transparent opacity={.2} />
        </mesh>
        <mesh rotation={[.2, 1.1, .4]}>
          <ringGeometry args={[2.62, 2.635, 96]} />
          <meshBasicMaterial color="#497d9a" transparent opacity={.14} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

export function AtmosphericScene() {
  const compact = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  return (
    <div className="spatial-canvas" aria-hidden="true">
      <Canvas
        dpr={compact ? [1, 1] : [1, 1.4]}
        camera={{ position: [0, 0, 6.2], fov: 50, near: .1, far: 80 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#040a11", 8, 31]} />
        <SpatialWorld compact={compact} />
      </Canvas>
    </div>
  );
}
