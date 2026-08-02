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

  const nearPositions = useMemo(() => makeField(900, 8, 12), []);
  const farPositions = useMemo(() => makeField(1250, 15, 24), []);

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
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useFrame((_state, delta) => {
    if (!rig.current || !nearPoints.current || !farPoints.current || !core.current) return;
    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    const { x, y } = input.current;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * 0.24, 3.4, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * 0.13, 3.4, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * 0.48, 3, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * 0.3 + scroll * 0.24, 3, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, scroll * 0.8, 2.2, delta);
    nearPoints.current.rotation.z += delta * 0.012;
    farPoints.current.rotation.z -= delta * 0.003;
    core.current.rotation.x += delta * 0.035;
    core.current.rotation.y -= delta * 0.05;
  });

  return (
    <group ref={rig}>
      <Points ref={farPoints} positions={farPositions} stride={3} frustumCulled>
        <PointMaterial transparent color="#8f553b" size={0.025} sizeAttenuation depthWrite={false} opacity={0.34} />
      </Points>
      <Points ref={nearPoints} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial transparent color="#ff9567" size={0.035} sizeAttenuation depthWrite={false} opacity={0.78} />
      </Points>
      <Line points={pathway} color="#f2ae84" lineWidth={0.8} transparent opacity={0.58} />
      <group ref={core} position={[3.35, 0.4, -1.4]}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color="#e77d4e" wireframe transparent opacity={0.24} />
        </mesh>
        <mesh rotation={[0.5, 0.2, 0.8]}>
          <torusGeometry args={[1.85, 0.012, 8, 120]} />
          <meshBasicMaterial color="#ffd0b4" transparent opacity={0.48} />
        </mesh>
        <mesh rotation={[1.2, 0.7, 0.1]}>
          <torusGeometry args={[2.25, 0.008, 8, 120]} />
          <meshBasicMaterial color="#b96f45" transparent opacity={0.28} />
        </mesh>
      </group>
      {pathway.map((point, index) => (
        <Float key={index} speed={0.8 + index * 0.14} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={point}>
            <sphereGeometry args={[index === 3 ? 0.13 : 0.085, 20, 20]} />
            <meshBasicMaterial color={index === 3 ? "#ff8b5c" : "#d8a07b"} transparent opacity={0.9} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function AtmosphericScene() {
  return (
    <div className="spatial-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 52 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <SpatialField />
      </Canvas>
    </div>
  );
}
