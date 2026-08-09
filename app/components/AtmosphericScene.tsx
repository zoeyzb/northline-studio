"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function SpatialField({ compact }: { compact: boolean }) {
  const nearPoints = useRef<THREE.Points>(null);
  const midPoints = useRef<THREE.Points>(null);
  const farPoints = useRef<THREE.Points>(null);
  const rig = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const input = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const sceneTarget = useRef({ color: new THREE.Color("#72d9f2"), opacity: 0.6, depth: 0, spread: 1 });
  const nearMaterial = useRef<THREE.PointsMaterial>(null);
  const midMaterial = useRef<THREE.PointsMaterial>(null);
  const farMaterial = useRef<THREE.PointsMaterial>(null);
  const active = useRef(true);

  const makeField = (count: number, spread: number, depth: number, offset = 0) => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < values.length; index += 3) {
      const point = index / 3 + offset;
      const radius = 2.4 + (((point * 47) % 101) / 101) * spread;
      const angle = point * 2.399963229728653;
      values[index] = Math.cos(angle) * radius;
      values[index + 1] = ((((point * 67) % 97) / 97) - 0.5) * spread;
      values[index + 2] = -(((point * 83) % 103) / 103) * depth + 2;
    }
    return values;
  };

  const nearPositions = useMemo(() => makeField(compact ? 180 : 420, 7.5, 11), [compact]);
  const midPositions = useMemo(() => makeField(compact ? 230 : 560, 11, 18, 19), [compact]);
  const farPositions = useMemo(() => makeField(compact ? 280 : 680, 16, 28, 43), [compact]);
  const pathway = useMemo(() => [
    new THREE.Vector3(-5.4, -1.65, .2),
    new THREE.Vector3(-2.6, .8, -.7),
    new THREE.Vector3(.4, -.45, -1.8),
    new THREE.Vector3(3.2, .9, -2.7),
    new THREE.Vector3(5.6, -.15, -3.9),
  ], []);
  const secondaryPath = useMemo(() => [
    new THREE.Vector3(-5.8, 2.1, -4.8),
    new THREE.Vector3(-2.1, 1.2, -5.6),
    new THREE.Vector3(1.8, 2.2, -6.4),
    new THREE.Vector3(5.3, 1.15, -7.1),
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
    const sceneMap: Record<string, { color: string; opacity: number; depth: number; spread: number }> = {
      overview: { color: "#72d9f2", opacity: .62, depth: 0, spread: 1 },
      proof: { color: "#83cee4", opacity: .34, depth: .35, spread: .94 },
      story: { color: "#8be8f8", opacity: .52, depth: .9, spread: 1.08 },
      work: { color: "#5bd2ed", opacity: .56, depth: 1.35, spread: 1.12 },
      problems: { color: "#8ccfe1", opacity: .3, depth: 1.8, spread: .98 },
      services: { color: "#4f9fc4", opacity: .27, depth: 2.2, spread: 1.04 },
      method: { color: "#72d9f2", opacity: .44, depth: 2.7, spread: 1.1 },
      engagements: { color: "#85c8e0", opacity: .32, depth: 3.08, spread: .96 },
      about: { color: "#9ed8e7", opacity: .24, depth: 3.45, spread: .9 },
      contact: { color: "#c8eff8", opacity: .22, depth: 3.82, spread: .86 },
    };
    const onScene = (event: Event) => {
      const next = sceneMap[(event as CustomEvent<{ scene: string }>).detail.scene];
      if (next) sceneTarget.current = { color: new THREE.Color(next.color), opacity: next.opacity, depth: next.depth, spread: next.spread };
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
    if (!active.current || !rig.current || !nearPoints.current || !midPoints.current || !farPoints.current || !core.current) return;
    const { x, y } = input.current;
    const scroll = scrollProgress.current;
    const target = sceneTarget.current;
    const drift = Math.sin(state.clock.elapsedTime * .18) * .08;

    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, x * .18 + drift, 3.1, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -y * .085 + scroll * .03, 3.1, delta);
    rig.current.position.x = THREE.MathUtils.damp(rig.current.position.x, x * .34, 3, delta);
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, y * .2 + scroll * 1.25, 3, delta);
    rig.current.position.z = THREE.MathUtils.damp(rig.current.position.z, scroll * 1.05 + target.depth, 2.15, delta);
    rig.current.scale.setScalar(THREE.MathUtils.damp(rig.current.scale.x, target.spread, 2.1, delta));

    if (nearMaterial.current && midMaterial.current && farMaterial.current) {
      nearMaterial.current.color.lerp(target.color, Math.min(delta * 2.3, 1));
      nearMaterial.current.opacity = THREE.MathUtils.damp(nearMaterial.current.opacity, target.opacity, 2.2, delta);
      midMaterial.current.color.lerp(target.color, Math.min(delta * 1.8, 1));
      midMaterial.current.opacity = THREE.MathUtils.damp(midMaterial.current.opacity, target.opacity * .52, 2.1, delta);
      farMaterial.current.color.lerp(target.color, Math.min(delta * 1.35, 1));
      farMaterial.current.opacity = THREE.MathUtils.damp(farMaterial.current.opacity, target.opacity * .25, 2, delta);
    }

    nearPoints.current.rotation.z += delta * .006;
    nearPoints.current.rotation.y += delta * .0018;
    midPoints.current.rotation.z -= delta * .0028;
    farPoints.current.rotation.z += delta * .0011;

    core.current.rotation.x += delta * .012;
    core.current.rotation.y -= delta * .02;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * .7) * .025;
    core.current.scale.setScalar(pulse);
  });

  return (
    <group ref={rig}>
      <Points ref={farPoints} positions={farPositions} stride={3} frustumCulled>
        <PointMaterial ref={farMaterial} transparent color="#2f6d8d" size={.017} sizeAttenuation depthWrite={false} opacity={.15} />
      </Points>
      <Points ref={midPoints} positions={midPositions} stride={3} frustumCulled>
        <PointMaterial ref={midMaterial} transparent color="#4a9cbc" size={.022} sizeAttenuation depthWrite={false} opacity={.28} />
      </Points>
      <Points ref={nearPoints} positions={nearPositions} stride={3} frustumCulled>
        <PointMaterial ref={nearMaterial} transparent color="#72d9f2" size={.031} sizeAttenuation depthWrite={false} opacity={.62} />
      </Points>

      <Line points={pathway} color="#8fd4ef" lineWidth={.7} transparent opacity={.4} />
      <Line points={secondaryPath} color="#5e9fbd" lineWidth={.38} transparent opacity={.2} />

      <group ref={core} position={[3.5, .35, -1.5]}>
        <mesh><icosahedronGeometry args={[1.28, 1]} /><meshBasicMaterial color="#46a0c8" wireframe transparent opacity={.14} /></mesh>
        <mesh rotation={[.5, .2, .8]}><torusGeometry args={[1.78, .01, 8, 96]} /><meshBasicMaterial color="#b7e6f5" transparent opacity={.28} /></mesh>
        <mesh rotation={[1.1, .4, .15]}><torusGeometry args={[2.1, .008, 8, 96]} /><meshBasicMaterial color="#72d9f2" transparent opacity={.12} /></mesh>
      </group>

      {pathway.map((point, index) => (
        <Float key={`primary-${index}`} speed={.5 + index * .08} rotationIntensity={.08} floatIntensity={.28}>
          <mesh position={point}><sphereGeometry args={[index === pathway.length - 1 ? .13 : .07, 16, 16]} /><meshBasicMaterial color={index === pathway.length - 1 ? "#72d9f2" : "#78bcd8"} transparent opacity={.76} /></mesh>
        </Float>
      ))}
      {secondaryPath.map((point, index) => (
        <Float key={`secondary-${index}`} speed={.32 + index * .05} rotationIntensity={.05} floatIntensity={.18}>
          <mesh position={point}><sphereGeometry args={[.045, 12, 12]} /><meshBasicMaterial color="#70a9c1" transparent opacity={.42} /></mesh>
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
        <fog attach="fog" args={["#050b12", 7, 27]} />
        <SpatialField compact={compact} />
      </Canvas>
    </div>
  );
}
