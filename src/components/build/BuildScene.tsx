"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, TorusKnot } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const ACCENT = "#3A64F0";

/** One object rendered at four stages of a build: sketch → clay → material → final. */
function Model({ stage }: { stage: number }) {
  const group = useRef<THREE.Group>(null);
  const last = useRef(stage);
  const pop = useRef(1);

  useFrame((state, dt) => {
    if (!group.current) return;
    if (last.current !== stage) {
      last.current = stage;
      pop.current = 0.86;
    }
    pop.current = THREE.MathUtils.damp(pop.current, 1, 6, dt);
    group.current.scale.setScalar(pop.current);
    group.current.rotation.y += dt * 0.35;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
  });

  return (
    <group ref={group}>
      {stage === 0 && (
        <TorusKnot args={[0.85, 0.3, 160, 18]}>
          <meshBasicMaterial color={ACCENT} wireframe />
        </TorusKnot>
      )}
      {stage === 1 && (
        <TorusKnot args={[0.85, 0.3, 220, 32]}>
          <meshStandardMaterial color="#e9e5dc" roughness={1} metalness={0} flatShading />
        </TorusKnot>
      )}
      {stage === 2 && (
        <TorusKnot args={[0.85, 0.3, 260, 40]}>
          <meshPhysicalMaterial color={ACCENT} roughness={0.28} metalness={0.55} clearcoat={0.6} />
        </TorusKnot>
      )}
      {stage === 3 && (
        <>
          <TorusKnot args={[0.85, 0.3, 300, 48]}>
            <meshPhysicalMaterial
              color="#b9c8ff"
              metalness={1}
              roughness={0.12}
              clearcoat={1}
              clearcoatRoughness={0.05}
              iridescence={0.9}
              iridescenceIOR={1.4}
              envMapIntensity={1.05}
            />
          </TorusKnot>
          <mesh>
            <icosahedronGeometry args={[0.32, 1]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.6} flatShading />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function BuildScene({ stage, lite, active }: { stage: number; lite: boolean; active: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0.3, 5.6], fov: 34 }}
      gl={{ antialias: !lite, alpha: true }}
      frameloop={active ? "always" : "demand"}
    >
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={7} position={[-5, 4, 4]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} color="#5E8BFF" position={[5, -2, 3]} scale={[6, 4, 1]} />
        <Lightformer form="ring" intensity={4} position={[0, 5, -4]} scale={4} />
        <Lightformer form="rect" intensity={2} position={[0, 0, -9]} scale={[22, 12, 1]} />
      </Environment>
      <ambientLight intensity={stage === 1 ? 0.9 : 0.5} />
      <directionalLight position={[3, 4, 6]} intensity={stage === 1 ? 2.6 : 1.6} />
      <Model stage={stage} />
      {stage > 0 && <ContactShadows position={[0, -1.55, 0]} opacity={0.32} blur={2.6} scale={8} far={4} />}
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.9} maxPolarAngle={2.2} />
    </Canvas>
  );
}
