"use client";

import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface MaisonModelProps {
  theme: "crystal" | "amber" | "emerald";
  fluidActive: boolean;
}

export function MaisonModel({ theme, fluidActive }: MaisonModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Points>(null);

  const themeColors = useMemo(() => {
    switch (theme) {
      case "amber":
        return {
          glass: "#fef3c7",
          liquid: "#d97706",
          accent: "#f59e0b",
          metal: "#b45309",
          particles: "#fde68a",
          glow: "#fbbf24",
        };
      case "emerald":
        return {
          glass: "#d1fae5",
          liquid: "#059669",
          accent: "#10b981",
          metal: "#047857",
          particles: "#6ee7b7",
          glow: "#34d399",
        };
      case "crystal":
      default:
        return {
          glass: "#ffffff",
          liquid: "#fef08a",
          accent: "#eab308",
          metal: "#ca8a04",
          particles: "#fef9c3",
          glow: "#facc15",
        };
    }
  }, [theme]);

  // Generate 45 effervescent micro-bubbles
  const bubblePositions = useMemo(() => {
    const pos = new Float32Array(45 * 3);
    for (let i = 0; i < 45; i++) {
      const radius = Math.random() * 0.55;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.random() * 1.4 - 0.7; // Y
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Liquid subtle wave surge
    if (liquidRef.current) {
      if (fluidActive) {
        liquidRef.current.rotation.y = t * 0.4;
        liquidRef.current.scale.y = 1 + Math.sin(t * 2.5) * 0.04;
        liquidRef.current.position.y = -0.15 + Math.sin(t * 3) * 0.02;
      }
    }

    // Rising champagne bubbles
    if (bubblesRef.current) {
      const geom = bubblesRef.current.geometry;
      const positions = geom.attributes.position.array as Float32Array;
      for (let i = 0; i < 45; i++) {
        positions[i * 3 + 1] += dt * 0.45;
        if (positions[i * 3 + 1] > 0.75) {
          positions[i * 3 + 1] = -0.7;
        }
      }
      geom.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={rootRef} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.25}>
        {/* Outer Crystalline Decanter Vessel (Thick Faceted Glass) */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 1.15, 2.2, 12, 1, false]} />
          <meshPhysicalMaterial
            color={themeColors.glass}
            transmission={0.92}
            opacity={1}
            transparent={true}
            roughness={0.05}
            ior={1.52}
            thickness={1.5}
            specularIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Heavy Crystal Faceted Base */}
        <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.18, 1.3, 0.28, 12]} />
          <meshPhysicalMaterial
            color={themeColors.glass}
            transmission={0.88}
            roughness={0.08}
            ior={1.55}
            thickness={2.2}
          />
        </mesh>

        {/* Polished Gold Collar & Spout Rim */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.12, 32]} />
          <meshStandardMaterial
            color={themeColors.metal}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <torusGeometry args={[0.58, 0.05, 16, 48]} />
          <meshStandardMaterial
            color={themeColors.metal}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Sensory Culinary Liquid Core */}
        <mesh ref={liquidRef} position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.48, 1.05, 1.7, 16]} />
          <meshPhysicalMaterial
            color={themeColors.liquid}
            transmission={0.45}
            roughness={0.15}
            ior={1.38}
            attenuationColor={themeColors.liquid}
            attenuationDistance={0.5}
            transparent={true}
            opacity={0.85}
          />
        </mesh>

        {/* Effervescent Champagne Micro-bubbles */}
        <points ref={bubblesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[bubblePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color={themeColors.particles}
            transparent={true}
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Warm Ambient Internal Caustic Core Light */}
        <pointLight position={[0, -0.2, 0]} color={themeColors.glow} intensity={2.2} distance={3.5} />
      </Float>
    </group>
  );
}
