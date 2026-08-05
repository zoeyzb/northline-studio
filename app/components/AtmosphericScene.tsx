"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function SpatialField() {
  const nearPoints = useRef<THREE.Points>(null);
  const farPoints = useRef<THREE.Points>(null);
  const rig = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const input = useRef({ x: 0, y: 0 });
  const sceneTarget = useRef({ color: new THREE.Color("#6fd8ef"), opacity: 0.72, depth: 0 });
  const nearMaterial = useRef<THREE.PointsMaterial>(null);
  const farMaterial = useRef<THREE.PointsMaterial>(null);
  const visible = useRef(true);

  const makeField = (count: number, spread: number, depth: number) => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < values.length; index += 3) {
      const point = index / 3;
      const radius = 2.4 + (((point * 47) % 101) / 101) * spread;
      const angle = point * 2.399963229728653;
      values[index] = Math.cos(angle) * radius;
      values[index + 1] = ((((point * 67) % 97) / 97) - 0.5) * spread;
      values[index + 2] = -(((point * 83) % 103) / 103) * depth + 2;
    }
    return values;
  };

  const compactDevice = useMemo(
    () => window.matchMedia("(max-width: 760px), (pointer: coarse)").matches || (navigator.hardwareConcurrency ?? 8) <= 4,
    [],
  );
  const nearPositions = useMemo(() => makeField(compactDevice ? 360 : 780, 8, 12), [compactDevice]);
  const farPositions = useMemo(() => makeField(compactDevice ? 520 : 1100, 15, 24), [compactDevice]);

  const pathway = useMemo(
    () => [
      new THREE.Vector3(-4.5, -1.2, 0),
      new THREE.Vector3(-1.7, 0.5, -1.2),
      new THREE.Vector3(1.2, -0.2, -2),
      new THREE.Vector3(4.8, 1.25, -3.2),
    ],
    [],
  );

  useEffect(() => {
    const setInput = (clientX: number, clientY: number) => {
      input.current.x = (clientX / window.innerWidth) * 2 - 1;
      input.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };
    const onPointer = (event: PointerEvent) => setInput(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setInput(touch.clientX, touch.clientY);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    const sceneMap: Record<string, { color: string; opacity: number; depth: number }> = {
      overview: { color: "#6fd8ef", opacity: 0.72, depth: 0 },
      audience: { color: "#9fdcef", opacity: 0.42, depth: 0.65 },
      services: { color: "#4f9fc4", opacity: 0.3, depth: 1.3 },
      method: { color: "#6fc4e0", opacity: 0.4, depth: 1.9 },
      work: { color: "#5fd0ef", opacity: 0.72, depth: 2.7 },
      engagements: { color: "#85c8e0", opacity: 0.46, depth: 3.15 },
      contact: { color: "#b7dcef", opacity: 0.3, depth: 3.65 },
    };
    const onScene = (event: Event) => {
      const scene = (event as CustomEvent<{ scene: string }>).detail.scene;
      const next = sceneMap[scene];
      if (next) sceneTarget.current = { color: new THREE.Color(next.color), opacity: next.opacity, depth: next.depth };
    };
    const onVisibility = () => { visible.current = !document.hidden; };
    window.addEventListener("northline:scene", onScene);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("northline:scene", onScene);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useFrame((_state, delta) => {
    if (!visible.current || !rig.current || !nearPoints.current || !farPoints.current || !core.current) return;
    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    const { x, y } = input.current;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * 0.22, 3.4, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * 0.11, 3.4, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * 0.42, 3, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * 0.26 + scroll * 0.25, 3, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, scroll * 0.2 + sceneTarget.current.depth, 2.2, delta);
    if (nearMaterial.current && farMaterial.current) {
      nearMaterial.current.color.lerp(sceneTarget.current.color, Math.min(delta * 2.4, 1));
      nearMaterial.current.opacity = THREE.MathUtils.damp(nearMaterial.current.opacity, sceneTarget.current.opacity, 2.4, delta);
      farMaterial.current.color.lerp(sceneTarget.current.color, Math.min(delta * 1.5, 1));
      farMaterial.current.opacity = THREE.MathUtils.damp(farMaterial.current.opacity, sceneTarget.current.opacity * 0.38, 2.4, delta);
    }
    nearPoints.current.rotation.z += delta * 0.009;
    farPoints.current.rotation.z -= delta * 0.0025;
    core.current.rotation.x += delta * 0.026;
    core.current.rotation.y -= delta * 0.038;
  });

  return (
    <group ref={rig}>
      <Points ref={farPoints} positions={farPositions} stride={3} frustumCulled>
        <PointMaterial ref={farMaterial} transparent color="#2f6d8d" size={0.023} sizeAttenuation depthWrite={false} opacity={0.28} />
      </Points>
      <Points ref={nearPoints} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial ref={nearMaterial} transparent color="#6fd8ef" size={0.032} sizeAttenuation depthWrite={false} opacity={0.72} />
      </Points>
      <Line points={pathway} color="#8fd4ef" lineWidth={0.75} transparent opacity={0.5} />
      <group ref={core} position={[3.35, 0.4, -1.4]}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color="#46a0c8" wireframe transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[0.5, 0.2, 0.8]}>
          <torusGeometry args={[1.85, 0.012, 8, 120]} />
          <meshBasicMaterial color="#b7e6f5" transparent opacity={0.42} />
        </mesh>
        <mesh rotation={[1.2, 0.7, 0.1]}>
          <torusGeometry args={[2.25, 0.008, 8, 120]} />
          <meshBasicMaterial color="#3c8fbf" transparent opacity={0.24} />
        </mesh>
      </group>
      {pathway.map((point, index) => (
        <Float key={index} speed={0.7 + index * 0.12} rotationIntensity={0.16} floatIntensity={0.42}>
          <mesh position={point}>
            <sphereGeometry args={[index === 3 ? 0.13 : 0.085, 20, 20]} />
            <meshBasicMaterial color={index === 3 ? "#71d8ef" : "#78bcd8"} transparent opacity={0.88} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function AtmosphericScene() {
  const compactDevice = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
  return (
    <div className="spatial-canvas" aria-hidden="true">
      <Canvas
        dpr={compactDevice ? [1, 1.1] : [1, 1.45]}
        camera={{ position: [0, 0, 6], fov: 52 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#060e16", 7, 25]} />
        <SpatialField />
      </Canvas>
    </div>
  );
}
