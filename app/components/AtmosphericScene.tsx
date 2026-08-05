"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function SpatialField({ compact }: { compact: boolean }) {
  const nearPoints = useRef<THREE.Points>(null);
  const farPoints = useRef<THREE.Points>(null);
  const rig = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const input = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const sceneTarget = useRef({ color: new THREE.Color("#72d9f2"), opacity: 0.6, depth: 0 });
  const nearMaterial = useRef<THREE.PointsMaterial>(null);
  const farMaterial = useRef<THREE.PointsMaterial>(null);
  const active = useRef(true);

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

  const nearPositions = useMemo(() => makeField(compact ? 220 : 520, 8, 12), [compact]);
  const farPositions = useMemo(() => makeField(compact ? 300 : 720, 15, 24), [compact]);
  const pathway = useMemo(() => [
    new THREE.Vector3(-4.5, -1.2, 0),
    new THREE.Vector3(-1.7, 0.5, -1.2),
    new THREE.Vector3(1.2, -0.2, -2),
    new THREE.Vector3(4.8, 1.25, -3.2),
  ], []);

  useEffect(() => {
    const setInput = (clientX: number, clientY: number) => {
      input.current.x = (clientX / window.innerWidth) * 2 - 1;
      input.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };
    const updateScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      scrollProgress.current = window.scrollY / max;
    };
    const onPointer = (event: PointerEvent) => setInput(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setInput(touch.clientX, touch.clientY);
    };
    const sceneMap: Record<string, { color: string; opacity: number; depth: number }> = {
      overview: { color: "#72d9f2", opacity: .6, depth: 0 },
      proof: { color: "#83cee4", opacity: .32, depth: .45 },
      work: { color: "#5bd2ed", opacity: .54, depth: 1.2 },
      problems: { color: "#8ccfe1", opacity: .28, depth: 1.65 },
      services: { color: "#4f9fc4", opacity: .25, depth: 2.05 },
      method: { color: "#72d9f2", opacity: .42, depth: 2.55 },
      engagements: { color: "#85c8e0", opacity: .3, depth: 3 },
      about: { color: "#9ed8e7", opacity: .22, depth: 3.35 },
      contact: { color: "#c8eff8", opacity: .2, depth: 3.7 },
    };
    const onScene = (event: Event) => {
      const next = sceneMap[(event as CustomEvent<{ scene: string }>).detail.scene];
      if (next) sceneTarget.current = { color: new THREE.Color(next.color), opacity: next.opacity, depth: next.depth };
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
    if (!active.current || !rig.current || !nearPoints.current || !farPoints.current || !core.current) return;
    const { x, y } = input.current;
    const scroll = scrollProgress.current;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .17, 3.2, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .08, 3.2, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .3, 3, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .18 + scroll * 1.1, 3, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, scroll * .9 + sceneTarget.current.depth, 2.2, delta);
    if (nearMaterial.current && farMaterial.current) {
      nearMaterial.current.color.lerp(sceneTarget.current.color, Math.min(delta * 2.2, 1));
      nearMaterial.current.opacity = THREE.MathUtils.damp(nearMaterial.current.opacity, sceneTarget.current.opacity, 2.2, delta);
      farMaterial.current.color.lerp(sceneTarget.current.color, Math.min(delta * 1.4, 1));
      farMaterial.current.opacity = THREE.MathUtils.damp(farMaterial.current.opacity, sceneTarget.current.opacity * .34, 2.2, delta);
    }
    nearPoints.current.rotation.z += delta * .005;
    farPoints.current.rotation.z -= delta * .0015;
    core.current.rotation.x += delta * .015;
    core.current.rotation.y -= delta * .022;
  });

  return (
    <group ref={rig}>
      <Points ref={farPoints} positions={farPositions} stride={3} frustumCulled>
        <PointMaterial ref={farMaterial} transparent color="#2f6d8d" size={.021} sizeAttenuation depthWrite={false} opacity={.2} />
      </Points>
      <Points ref={nearPoints} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial ref={nearMaterial} transparent color="#72d9f2" size={.03} sizeAttenuation depthWrite={false} opacity={.6} />
      </Points>
      <Line points={pathway} color="#8fd4ef" lineWidth={.65} transparent opacity={.42} />
      <group ref={core} position={[3.35, .4, -1.4]}>
        <mesh><icosahedronGeometry args={[1.25, 1]} /><meshBasicMaterial color="#46a0c8" wireframe transparent opacity={.15} /></mesh>
        <mesh rotation={[.5, .2, .8]}><torusGeometry args={[1.75, .01, 8, 96]} /><meshBasicMaterial color="#b7e6f5" transparent opacity={.3} /></mesh>
      </group>
      {pathway.map((point, index) => (
        <Float key={index} speed={.55 + index * .1} rotationIntensity={.1} floatIntensity={.3}>
          <mesh position={point}><sphereGeometry args={[index === 3 ? .12 : .075, 16, 16]} /><meshBasicMaterial color={index === 3 ? "#72d9f2" : "#78bcd8"} transparent opacity={.78} /></mesh>
        </Float>
      ))}
    </group>
  );
}

export function AtmosphericScene() {
  const compact = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  return (
    <div className="spatial-canvas" aria-hidden="true">
      <Canvas dpr={compact ? [1, 1] : [1, 1.25]} camera={{ position: [0, 0, 6], fov: 52 }} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <fog attach="fog" args={["#050b12", 7, 25]} />
        <SpatialField compact={compact} />
      </Canvas>
    </div>
  );
}
