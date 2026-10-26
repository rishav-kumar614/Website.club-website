"use client";

import { useFrame } from "@react-three/fiber";
import { Edges, Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface OrbitModelProps {
  exploded: boolean;
  wireframe: boolean;
  colorway: "titanium" | "stealth" | "cyber";
}

export function OrbitModel({ exploded, wireframe, colorway }: OrbitModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const grillRef = useRef<THREE.Group>(null);
  const driverRef = useRef<THREE.Group>(null);
  const pcbRef = useRef<THREE.Group>(null);
  const backplateRef = useRef<THREE.Group>(null);
  const pulseLightRef = useRef<THREE.PointLight>(null);

  // Colorway palettes
  const palette = useMemo(() => {
    switch (colorway) {
      case "stealth":
        return {
          chassis: "#090d16",
          accent: "#d97706",
          grill: "#1e293b",
          coil: "#f59e0b",
          glow: "#fbbf24",
          metalness: 0.85,
          roughness: 0.25,
        };
      case "cyber":
        return {
          chassis: "#061325",
          accent: "#00f0ff",
          grill: "#0e2338",
          coil: "#38bdf8",
          glow: "#00f0ff",
          metalness: 0.9,
          roughness: 0.15,
        };
      case "titanium":
      default:
        return {
          chassis: "#1e2433",
          accent: "#38bdf8",
          grill: "#334155",
          coil: "#e2e8f0",
          glow: "#60a5fa",
          metalness: 0.95,
          roughness: 0.18,
        };
    }
  }, [colorway]);

  // Explode target offsets
  const explodeAmount = exploded ? 1 : 0;

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Smooth lerp for exploded positions along Z axis
    const zOuter = THREE.MathUtils.lerp(0.35, 1.6, explodeAmount);
    const zGrill = THREE.MathUtils.lerp(0.18, 0.85, explodeAmount);
    const zDriver = THREE.MathUtils.lerp(0, 0, explodeAmount);
    const zPcb = THREE.MathUtils.lerp(-0.18, -0.85, explodeAmount);
    const zBack = THREE.MathUtils.lerp(-0.35, -1.6, explodeAmount);

    if (outerRingRef.current) {
      outerRingRef.current.position.z = THREE.MathUtils.damp(outerRingRef.current.position.z, zOuter, 4, dt);
    }
    if (grillRef.current) {
      grillRef.current.position.z = THREE.MathUtils.damp(grillRef.current.position.z, zGrill, 4, dt);
    }
    if (driverRef.current) {
      driverRef.current.position.z = THREE.MathUtils.damp(driverRef.current.position.z, zDriver, 4, dt);
      driverRef.current.rotation.z = t * 0.2;
    }
    if (pcbRef.current) {
      pcbRef.current.position.z = THREE.MathUtils.damp(pcbRef.current.position.z, zPcb, 4, dt);
    }
    if (backplateRef.current) {
      backplateRef.current.position.z = THREE.MathUtils.damp(backplateRef.current.position.z, zBack, 4, dt);
    }

    // Pulse core LED light
    if (pulseLightRef.current) {
      pulseLightRef.current.intensity = 1.5 + Math.sin(t * 4) * 0.8;
    }
  });

  return (
    <group ref={rootRef} dispose={null}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Layer 1: Front Bezel / Outer Aerospace Ring */}
        <group ref={outerRingRef} position={[0, 0, 0.35]}>
          <mesh castShadow receiveShadow>
            <torusGeometry args={[1.5, 0.16, 24, 64]} />
            <meshStandardMaterial
              color={palette.chassis}
              metalness={palette.metalness}
              roughness={palette.roughness}
              wireframe={wireframe}
            />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <ringGeometry args={[1.3, 1.48, 48]} />
            <meshStandardMaterial
              color={palette.accent}
              emissive={palette.accent}
              emissiveIntensity={0.5}
              wireframe={wireframe}
            />
          </mesh>
          {wireframe && <Edges threshold={15} color={palette.accent} />}
        </group>

        {/* Layer 2: Acoustic Honeycomb Grill & Sound Ports */}
        <group ref={grillRef} position={[0, 0, 0.18]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.34, 1.34, 0.08, 48]} />
            <meshStandardMaterial
              color={palette.grill}
              metalness={0.7}
              roughness={0.3}
              wireframe={wireframe}
            />
          </mesh>
          {/* Circular acoustic mesh aperture ring */}
          <mesh position={[0, 0, 0.05]}>
            <ringGeometry args={[0.4, 1.25, 32]} />
            <meshBasicMaterial color={palette.accent} wireframe={true} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Layer 3: Neodymium Magnetic Driver & Copper Coil (Core) */}
        <group ref={driverRef} position={[0, 0, 0]}>
          {/* Driver Dome */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshPhysicalMaterial
              color="#e0e7ff"
              metalness={0.98}
              roughness={0.08}
              clearcoat={1}
              wireframe={wireframe}
            />
          </mesh>
          {/* Copper Voice Coil Ring */}
          <mesh position={[0, 0, -0.05]}>
            <torusGeometry args={[0.65, 0.08, 16, 48]} />
            <meshStandardMaterial
              color={palette.coil}
              metalness={0.95}
              roughness={0.2}
              wireframe={wireframe}
            />
          </mesh>
          {/* Neodymium Magnetic Ring Base */}
          <mesh position={[0, 0, -0.12]}>
            <cylinderGeometry args={[0.85, 0.85, 0.12, 32]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.9}
              roughness={0.25}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* Layer 4: Telemetry PCB Motherboard & Microcontroller */}
        <group ref={pcbRef} position={[0, 0, -0.18]}>
          {/* Hexagonal / Circular Logic Board */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.32, 1.32, 0.06, 32]} />
            <meshStandardMaterial
              color="#022c22"
              roughness={0.4}
              metalness={0.3}
              wireframe={wireframe}
            />
          </mesh>
          {/* Micro-components / Gold Chiplets */}
          {[-0.6, -0.2, 0.3, 0.6].map((x, i) => (
            <mesh key={i} position={[x, (i % 2 === 0 ? 1 : -1) * 0.45, 0.04]}>
              <boxGeometry args={[0.22, 0.18, 0.04]} />
              <meshStandardMaterial
                color="#0f172a"
                metalness={0.8}
                roughness={0.2}
                wireframe={wireframe}
              />
            </mesh>
          ))}
          {/* Center Pulsing Core LED */}
          <mesh position={[0, 0, 0.04]}>
            <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
            <meshBasicMaterial color={palette.glow} />
          </mesh>
          <pointLight ref={pulseLightRef} color={palette.glow} distance={4} intensity={2} />
        </group>

        {/* Layer 5: Acoustic Backplate Chassis */}
        <group ref={backplateRef} position={[0, 0, -0.35]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.48, 1.45, 0.22, 48]} />
            <meshStandardMaterial
              color={palette.chassis}
              metalness={palette.metalness}
              roughness={palette.roughness}
              wireframe={wireframe}
            />
          </mesh>
          {/* Embossed Telemetry Ring */}
          <mesh position={[0, 0, -0.12]}>
            <ringGeometry args={[0.7, 1.3, 32]} />
            <meshBasicMaterial color={palette.accent} wireframe={true} transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Floating Exploded Alignment Guide Lines (Visible only when exploded) */}
        {exploded && (
          <group>
            {[-1.2, 1.2].map((x, xi) =>
              [-1.2, 1.2].map((y, yi) => (
                <mesh key={`${xi}-${yi}`} position={[x * 0.8, y * 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.005, 0.005, 3.2, 8]} />
                  <meshBasicMaterial color={palette.accent} transparent opacity={0.35} />
                </mesh>
              ))
            )}
          </group>
        )}
      </Float>
    </group>
  );
}
