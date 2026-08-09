"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneTarget = {
  color: THREE.Color;
  secondary: THREE.Color;
  opacity: number;
  depth: number;
  spread: number;
  camera: number;
  rotation: number;
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function SpatialWorld({ compact }: { compact: boolean }) {
  const { camera } = useThree();
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
    opacity: .7,
    depth: 0,
    spread: 1,
    camera: 6.2,
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

  const deepPositions = useMemo(() => makeField(compact ? 380 : 980, 15, 30, 7), [compact]);
  const nearPositions = useMemo(() => makeField(compact ? 220 : 620, 8, 16, 13), [compact]);
  const dustPositions = useMemo(() => makeField(compact ? 160 : 420, 4.5, 10, 29), [compact]);

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
      overview: { color: "#72d9f2", secondary: "#2e749a", opacity: .78, depth: 0, spread: 1, camera: 6.2, rotation: 0 },
      trust: { color: "#8fe5f8", secondary: "#356f8c", opacity: .48, depth: .45, spread: .92, camera: 6.35, rotation: .08 },
      story: { color: "#63d6f2", secondary: "#285e89", opacity: .72, depth: 1.2, spread: 1.16, camera: 5.7, rotation: .22 },
      services: { color: "#79cbea", secondary: "#375b91", opacity: .54, depth: 2.0, spread: 1.05, camera: 6.05, rotation: -.12 },
      work: { color: "#a7e8f7", secondary: "#3f7f9e", opacity: .68, depth: 2.7, spread: .82, camera: 5.8, rotation: .16 },
      standards: { color: "#8bd7ea", secondary: "#315a78", opacity: .38, depth: 3.25, spread: 1.25, camera: 6.4, rotation: -.2 },
      process: { color: "#70dcf6", secondary: "#2a6d93", opacity: .58, depth: 3.85, spread: .9, camera: 5.9, rotation: .28 },
      engagements: { color: "#86cbe0", secondary: "#31546c", opacity: .36, depth: 4.35, spread: 1.18, camera: 6.35, rotation: -.08 },
      studio: { color: "#a6dce8", secondary: "#385568", opacity: .3, depth: 4.75, spread: .78, camera: 6.55, rotation: .12 },
      contact: { color: "#d2f6ff", secondary: "#4a9fc0", opacity: .78, depth: 5.5, spread: .62, camera: 5.35, rotation: .34 },
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

    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .12 + next.rotation, 2.4, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .06, 2.8, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .36, 2.5, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .2 + page * 1.2, 2.2, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, next.depth + page * .75, 2, delta);
    rig.current.scale.x = THREE.MathUtils.damp(rig.current.scale.x, next.spread, 2.1, delta);
    rig.current.scale.y = THREE.MathUtils.damp(rig.current.scale.y, next.spread, 2.1, delta);

    camera.position.z = THREE.MathUtils.damp(camera.position.z, next.camera, 2, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x * .15, 2.3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y * .08, 2.3, delta);
    camera.lookAt(0, 0, -3.5);

    if (nearMaterial.current && deepMaterial.current && dustMaterial.current) {
      nearMaterial.current.color.lerp(next.color, Math.min(delta * 2.2, 1));
      nearMaterial.current.opacity = THREE.MathUtils.damp(nearMaterial.current.opacity, next.opacity, 2.2, delta);
      deepMaterial.current.color.lerp(next.secondary, Math.min(delta * 1.45, 1));
      deepMaterial.current.opacity = THREE.MathUtils.damp(deepMaterial.current.opacity, next.opacity * .3, 1.8, delta);
      dustMaterial.current.color.lerp(next.color, Math.min(delta * 1.8, 1));
      dustMaterial.current.opacity = THREE.MathUtils.damp(dustMaterial.current.opacity, next.opacity * .18, 1.9, delta);
    }

    nearField.current.rotation.z += delta * .0045;
    deepField.current.rotation.z -= delta * .0012;
    dustField.current.rotation.y += delta * .0025;
    architecture.current.rotation.z = THREE.MathUtils.damp(architecture.current.rotation.z, next.rotation * .28, 2, delta);
    core.current.rotation.x += delta * .012;
    core.current.rotation.y -= delta * .018;
  });

  return (
    <group ref={rig}>
      <Points ref={deepField} positions={deepPositions} stride={3} frustumCulled>
        <PointMaterial ref={deepMaterial} transparent color="#2e749a" size={.018} sizeAttenuation depthWrite={false} opacity={.2} />
      </Points>
      <Points ref={nearField} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial ref={nearMaterial} transparent color="#72d9f2" size={.032} sizeAttenuation depthWrite={false} opacity={.7} />
      </Points>
      <Points ref={dustField} positions={dustPositions} stride={3} frustumCulled>
        <PointMaterial ref={dustMaterial} transparent color="#d2f6ff" size={.055} sizeAttenuation depthWrite={false} opacity={.12} />
      </Points>

      <group ref={architecture}>
        <Line points={pathPrimary} color="#83dff4" lineWidth={.65} transparent opacity={.36} />
        <Line points={pathSecondary} color="#477d9f" lineWidth={.4} transparent opacity={.18} />
        {pathPrimary.map((point, index) => (
          <Float key={`primary-${index}`} speed={.45 + index * .08} rotationIntensity={.08} floatIntensity={.24}>
            <mesh position={point}>
              <sphereGeometry args={[index === pathPrimary.length - 1 ? .11 : .065, 14, 14]} />
              <meshBasicMaterial color={index === pathPrimary.length - 1 ? "#d2f6ff" : "#73cce7"} transparent opacity={.75} />
            </mesh>
          </Float>
        ))}
        {pathSecondary.map((point, index) => (
          <mesh position={point} key={`secondary-${index}`}>
            <octahedronGeometry args={[.045, 0]} />
            <meshBasicMaterial color="#6caac5" transparent opacity={.42} />
          </mesh>
        ))}
      </group>

      <group ref={core} position={[3.7, .4, -2.8]}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color="#59b7d8" wireframe transparent opacity={.13} />
        </mesh>
        <mesh rotation={[.4, .1, .7]}>
          <torusGeometry args={[1.72, .012, 8, 100]} />
          <meshBasicMaterial color="#c4eff8" transparent opacity={.27} />
        </mesh>
        <mesh rotation={[-.65, .35, -.2]}>
          <torusGeometry args={[2.18, .008, 8, 100]} />
          <meshBasicMaterial color="#65b7d5" transparent opacity={.16} />
        </mesh>
        <mesh rotation={[.2, 1.1, .4]}>
          <ringGeometry args={[2.62, 2.635, 96]} />
          <meshBasicMaterial color="#497d9a" transparent opacity={.11} side={THREE.DoubleSide} />
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
        dpr={compact ? [1, 1] : [1, 1.35]}
        camera={{ position: [0, 0, 6.2], fov: 50, near: .1, far: 80 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#040a11", 8, 31]} />
        <SpatialWorld compact={compact} />
      </Canvas>
    </div>
  );
}
