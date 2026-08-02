"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SpatialField() {
  const points = useRef<THREE.Points>(null);
  const rig = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const positions = useMemo(() => {
    const values = new Float32Array(720 * 3);
    for (let index = 0; index < values.length; index += 3) {
      const point = index / 3;
      const radius = 2.8 + ((point * 47) % 101) / 101 * 8;
      const angle = point * 2.399963229728653;
      values[index] = Math.cos(angle) * radius;
      values[index + 1] = (((point * 67) % 97) / 97 - 0.5) * 9;
      values[index + 2] = -((point * 83) % 103) / 103 * 10 + 2;
    }
    return values;
  }, []);

  const pathway = useMemo(
    () => [
      new THREE.Vector3(-4.5, -1.2, 0),
      new THREE.Vector3(-1.7, 0.5, -1.2),
      new THREE.Vector3(1.2, -0.2, -2),
      new THREE.Vector3(4.8, 1.25, -3.2),
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!rig.current || !points.current) return;
    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, pointer.x * 0.08, 3, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -pointer.y * 0.045, 3, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, scroll * 0.45, 2.2, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, scroll * 0.18, 2.2, delta);
    points.current.rotation.z += delta * 0.008;
  });

  return (
    <group ref={rig}>
      <Points ref={points} positions={positions} stride={3} frustumCulled>
        <PointMaterial transparent color="#ff7a45" size={0.018} sizeAttenuation depthWrite={false} opacity={0.72} />
      </Points>
      <Line points={pathway} color="#d8a07b" lineWidth={0.65} transparent opacity={0.35} />
      {pathway.map((point, index) => (
        <Float key={index} speed={0.7 + index * 0.12} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={point}>
            <ringGeometry args={[0.08, 0.11, 32]} />
            <meshBasicMaterial color={index === 3 ? "#ff6b35" : "#bd7650"} transparent opacity={0.75} />
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
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <SpatialField />
      </Canvas>
    </div>
  );
}
