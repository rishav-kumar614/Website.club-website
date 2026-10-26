"use client";

import { useFrame } from "@react-three/fiber";
import { Edges, Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface FormaModelProps {
  timeOfDay: "sunset" | "night" | "day";
  wireframe: boolean;
  axonometric: boolean;
}

export function FormaModel({ timeOfDay, wireframe, axonometric }: FormaModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const upperFloorRef = useRef<THREE.Group>(null);

  // Lighting & atmosphere based on time of day
  const environment = useMemo(() => {
    switch (timeOfDay) {
      case "night":
        return {
          ambientColor: "#1e1b4b",
          ambientIntensity: 0.6,
          sunColor: "#38bdf8",
          sunIntensity: 0.8,
          sunPos: [4, 6, 4] as [number, number, number],
          interiorColor: "#fde047",
          poolColor: "#0284c7",
          concreteColor: "#334155",
        };
      case "day":
        return {
          ambientColor: "#f8fafc",
          ambientIntensity: 1.0,
          sunColor: "#ffffff",
          sunIntensity: 2.2,
          sunPos: [6, 9, 5] as [number, number, number],
          interiorColor: "#fef08a",
          poolColor: "#0ea5e9",
          concreteColor: "#f1f5f9",
        };
      case "sunset":
      default:
        return {
          ambientColor: "#7c2d12",
          ambientIntensity: 0.8,
          sunColor: "#fb923c",
          sunIntensity: 1.8,
          sunPos: [6, 3, -4] as [number, number, number],
          interiorColor: "#f59e0b",
          poolColor: "#0369a1",
          concreteColor: "#cbd5e1",
        };
    }
  }, [timeOfDay]);

  const liftAmount = axonometric ? 1 : 0;

  useFrame((state, dt) => {
    // Smooth lerp for axonometric roof and upper floor lift
    const targetRoofY = THREE.MathUtils.lerp(1.1, 2.2, liftAmount);
    const targetUpperY = THREE.MathUtils.lerp(0.55, 1.35, liftAmount);

    if (roofRef.current) {
      roofRef.current.position.y = THREE.MathUtils.damp(roofRef.current.position.y, targetRoofY, 4, dt);
    }
    if (upperFloorRef.current) {
      upperFloorRef.current.position.y = THREE.MathUtils.damp(upperFloorRef.current.position.y, targetUpperY, 4, dt);
    }
  });

  return (
    <group ref={rootRef} dispose={null}>
      {/* Dynamic Solar Lighting */}
      <ambientLight color={environment.ambientColor} intensity={environment.ambientIntensity} />
      <directionalLight
        position={environment.sunPos}
        color={environment.sunColor}
        intensity={environment.sunIntensity}
        castShadow
      />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
        {/* Ground Foundation Slab */}
        <group position={[0, -0.65, 0]}>
          <RoundedBox args={[3.6, 0.22, 2.8]} radius={0.04} smoothness={2} castShadow receiveShadow>
            <meshStandardMaterial
              color={environment.concreteColor}
              roughness={0.4}
              metalness={0.1}
              wireframe={wireframe}
            />
            {wireframe && <Edges threshold={20} color="#38bdf8" />}
          </RoundedBox>

          {/* Infinity Pool Water Feature */}
          <mesh position={[0.8, 0.12, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6, 1.1]} />
            <meshPhysicalMaterial
              color={environment.poolColor}
              roughness={0.05}
              metalness={0.8}
              transmission={0.6}
              ior={1.33}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* Lower Pavilion Glass Walls & Living Area */}
        <group position={[-0.4, -0.05, -0.2]}>
          {/* Glass Curtain Enclosure */}
          <RoundedBox args={[2.2, 0.95, 1.8]} radius={0.02} smoothness={2}>
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.85}
              roughness={0.05}
              ior={1.5}
              transparent
              opacity={wireframe ? 0.2 : 0.8}
              wireframe={wireframe}
            />
            {wireframe && <Edges threshold={15} color="#60a5fa" />}
          </RoundedBox>

          {/* Interior Architectural Illumination */}
          <pointLight position={[0, 0, 0]} color={environment.interiorColor} intensity={1.8} distance={3} />
        </group>

        {/* Cantilevered Upper Floor (Lifts in Axonometric mode) */}
        <group ref={upperFloorRef} position={[0.3, 0.55, 0.1]}>
          {/* Concrete Cantilever Slab */}
          <RoundedBox args={[2.6, 0.18, 2.2]} radius={0.04} smoothness={2} castShadow receiveShadow>
            <meshStandardMaterial
              color={environment.concreteColor}
              roughness={0.35}
              metalness={0.15}
              wireframe={wireframe}
            />
            {wireframe && <Edges threshold={20} color="#38bdf8" />}
          </RoundedBox>

          {/* Master Suite Glass Balcony */}
          <group position={[-0.2, 0.45, 0]}>
            <RoundedBox args={[1.8, 0.72, 1.6]} radius={0.02} smoothness={2}>
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.82}
                roughness={0.08}
                ior={1.5}
                transparent
                opacity={wireframe ? 0.2 : 0.75}
                wireframe={wireframe}
              />
              {wireframe && <Edges threshold={15} color="#60a5fa" />}
            </RoundedBox>
            <pointLight position={[0, 0, 0]} color={environment.interiorColor} intensity={1.4} distance={2.5} />
          </group>

          {/* Vertical Louver / Sunshade Fins */}
          {[0, 0.25, 0.5, 0.75].map((offset, i) => (
            <mesh key={i} position={[0.7 + offset * 0.4, 0.42, 0.85]}>
              <boxGeometry args={[0.04, 0.68, 0.18]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} wireframe={wireframe} />
            </mesh>
          ))}
        </group>

        {/* Roof Deck Canopy (Lifts in Axonometric mode) */}
        <group ref={roofRef} position={[0.2, 1.1, 0.1]}>
          <RoundedBox args={[2.8, 0.14, 2.4]} radius={0.04} smoothness={2} castShadow receiveShadow>
            <meshStandardMaterial
              color={environment.concreteColor}
              roughness={0.3}
              metalness={0.2}
              wireframe={wireframe}
            />
            {wireframe && <Edges threshold={20} color="#38bdf8" />}
          </RoundedBox>
        </group>

        {/* Minimalist Floating External Staircase */}
        <group position={[-1.25, -0.2, 0.8]}>
          {[0, 1, 2, 3, 4].map((step) => (
            <mesh key={step} position={[step * 0.12, step * 0.16, 0]}>
              <boxGeometry args={[0.32, 0.04, 0.45]} />
              <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} wireframe={wireframe} />
            </mesh>
          ))}
        </group>

        {/* Ground Coordinate CAD Blueprint Grid (Visible only in Wireframe mode) */}
        {wireframe && (
          <gridHelper args={[6, 12, "#38bdf8", "#1e3a8a"]} position={[0, -0.78, 0]} />
        )}
      </Float>
    </group>
  );
}
