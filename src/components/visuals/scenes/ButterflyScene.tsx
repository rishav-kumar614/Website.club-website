"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Procedural biological Morpho butterfly forewing texture.
 * Generates natural cellular venation, electric metallic sapphire core,
 * velvet-black margin, and submarginal pearl lunule crescents.
 */
function createForewingTexture() {
  if (typeof document === "undefined") return null;
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Deep Velvet Black Margin Base
  ctx.fillStyle = "#06070a";
  ctx.fillRect(0, 0, size, size);

  // 2. High-Luminance Iridescent Blue Core (Morpho Peleides structural color)
  const grad = ctx.createRadialGradient(size * 0.15, size * 0.85, 30, size * 0.42, size * 0.52, size * 0.72);
  grad.addColorStop(0, "#cffafe");      // Luminous cyan highlight core
  grad.addColorStop(0.18, "#38bdf8");   // Vivid sky cyan
  grad.addColorStop(0.42, "#0062ff");   // Electric sapphire blue
  grad.addColorStop(0.68, "#05299e");   // Deep royal cobalt
  grad.addColorStop(0.85, "#020f38");   // Midnight indigo shadow
  grad.addColorStop(1, "transparent");

  ctx.save();
  ctx.beginPath();
  // Constrain blue wash inside the wing profile
  ctx.ellipse(size * 0.44, size * 0.56, size * 0.42, size * 0.38, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // 3. Structural Biological Venation (Discal Cell & Radial Branches)
  ctx.save();
  const rootX = size * 0.08;
  const rootY = size * 0.92;

  // Discal Cell (Elongated loop at wing base)
  ctx.beginPath();
  ctx.ellipse(rootX + 180, rootY - 180, 150, 65, -Math.PI / 4.2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(10, 14, 28, 0.95)";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.strokeStyle = "rgba(140, 210, 255, 0.45)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Radial Veins radiating from Discal Cell out to margins
  const veinDestinations = [
    { x: size * 0.48, y: size * 0.08 },
    { x: size * 0.65, y: size * 0.12 },
    { x: size * 0.82, y: size * 0.22 },
    { x: size * 0.92, y: size * 0.38 },
    { x: size * 0.96, y: size * 0.54 },
    { x: size * 0.92, y: size * 0.72 },
    { x: size * 0.82, y: size * 0.86 },
    { x: size * 0.68, y: size * 0.94 },
  ];

  for (const dst of veinDestinations) {
    ctx.beginPath();
    ctx.moveTo(rootX + 120, rootY - 120);
    const cpx = (rootX + dst.x) * 0.5 + (Math.random() - 0.5) * 30;
    const cpy = (rootY + dst.y) * 0.5 + (Math.random() - 0.5) * 30;
    ctx.quadraticCurveTo(cpx, cpy, dst.x, dst.y);

    // Deep chitinous vein line
    ctx.strokeStyle = "#080c18";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Subtle specular ridge on the vein
    ctx.strokeStyle = "rgba(180, 230, 255, 0.5)";
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }

  // 4. Submarginal Pearlescent Spots (Biological Lunules)
  for (let i = 0; i < veinDestinations.length - 1; i++) {
    const p1 = veinDestinations[i];
    const p2 = veinDestinations[i + 1];
    const mx = (p1.x + p2.x) * 0.5 - 28;
    const my = (p1.y + p2.y) * 0.5 - 24;

    ctx.beginPath();
    ctx.ellipse(mx, my, 8, 14, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.fill();

    // Secondary subtle marginal chevron
    ctx.beginPath();
    ctx.arc(mx + 18, my + 14, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.fill();
  }

  // 5. Micro-scale Shimmer Texture (Structural scale noise)
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 2] > 60) {
      // If pixel has blue channel, add subtle micro-scale striations
      const noise = (Math.random() - 0.5) * 16;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
  }
  ctx.putImageData(imgData, 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural biological Morpho butterfly hindwing texture.
 */
function createHindwingTexture() {
  if (typeof document === "undefined") return null;
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Velvet black background
  ctx.fillStyle = "#06070a";
  ctx.fillRect(0, 0, size, size);

  // Large radiant sapphire core covering the full central wing
  const grad = ctx.createRadialGradient(size * 0.45, size * 0.5, 30, size * 0.48, size * 0.52, size * 0.65);
  grad.addColorStop(0, "#e0f2fe");
  grad.addColorStop(0.2, "#38bdf8");
  grad.addColorStop(0.48, "#0284c7");
  grad.addColorStop(0.72, "#1e3a8a");
  grad.addColorStop(0.9, "#090d16");
  grad.addColorStop(1, "#030712");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(size * 0.48, size * 0.52, size * 0.44, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // Branching iridescent biological veins
  ctx.save();
  const rootX = size * 0.2;
  const rootY = size * 0.3;

  const destinations = [
    { x: size * 0.85, y: size * 0.25 },
    { x: size * 0.92, y: size * 0.42 },
    { x: size * 0.95, y: size * 0.6 },
    { x: size * 0.88, y: size * 0.78 },
    { x: size * 0.72, y: size * 0.9 },
    { x: size * 0.5, y: size * 0.94 },
    { x: size * 0.32, y: size * 0.88 },
  ];

  for (const dst of destinations) {
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.quadraticCurveTo((rootX + dst.x) * 0.5, (rootY + dst.y) * 0.5 - 15, dst.x, dst.y);
    ctx.strokeStyle = "#080c18";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.strokeStyle = "rgba(180, 230, 255, 0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Pearlescent marginal lunules
  for (let i = 0; i < destinations.length; i++) {
    const p = destinations[i];
    ctx.beginPath();
    ctx.ellipse(p.x - 24, p.y - 12, 7, 12, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fill();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Anatomical Forewing Shape (True Morpho peleides outline)
 */
function createForewingShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);

  // Costal Margin (Leading Edge curving forward and upward to Apex)
  shape.bezierCurveTo(0.18, 0.55, 0.65, 1.48, 1.48, 1.78);
  // Rounded Apex
  shape.bezierCurveTo(1.72, 1.82, 1.88, 1.68, 1.82, 1.42);
  // Outer Margin (Termen with natural scalloped ripples)
  shape.bezierCurveTo(1.75, 1.18, 1.62, 0.88, 1.45, 0.55);
  shape.bezierCurveTo(1.35, 0.35, 1.25, 0.18, 1.05, 0.05);
  // Inner Margin (Dorsum returning cleanly to thoracic hinge)
  shape.bezierCurveTo(0.65, 0.01, 0.25, 0.01, 0, 0);

  return shape;
}

/**
 * Anatomical Hindwing Shape (Rounded fan with scalloped trailing margin)
 */
function createHindwingShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.05);

  // Upper margin (overlaps beneath forewing)
  shape.bezierCurveTo(0.35, -0.02, 0.82, -0.06, 1.15, -0.18);
  // Outer scalloped margin
  shape.bezierCurveTo(1.35, -0.35, 1.32, -0.68, 1.18, -0.98);
  shape.bezierCurveTo(1.02, -1.22, 0.82, -1.35, 0.58, -1.38);
  // Anal margin curving back to abdomen base
  shape.bezierCurveTo(0.32, -1.25, 0.12, -0.75, 0, -0.35);
  shape.lineTo(0, -0.05);

  return shape;
}

/**
 * Curved 3D Antenna Curve
 */
function createAntennaCurve(isLeft: boolean): THREE.CatmullRomCurve3 {
  const sign = isLeft ? -1 : 1;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(sign * 0.06, 0.12, 0.06),
    new THREE.Vector3(sign * 0.14, 0.28, 0.12),
    new THREE.Vector3(sign * 0.22, 0.42, 0.18),
    new THREE.Vector3(sign * 0.28, 0.52, 0.22),
  ]);
}

/**
 * Realistic Biological Butterfly with 4 independent anatomical wings,
 * segmented velvet thorax, abdomen, compound eyes, and natural flight kinematics.
 */
function RealisticButterfly({ lite }: { lite: boolean }) {
  const butterflyRef = useRef<THREE.Group>(null);

  // 4 Independent Wing Hinges (Lepidoptera 4-wing flight)
  const leftForewingRef = useRef<THREE.Group>(null);
  const rightForewingRef = useRef<THREE.Group>(null);
  const leftHindwingRef = useRef<THREE.Group>(null);
  const rightHindwingRef = useRef<THREE.Group>(null);

  const [foreTexture, setForeTexture] = useState<THREE.CanvasTexture | null>(null);
  const [hindTexture, setHindTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const fTex = createForewingTexture();
    const hTex = createHindwingTexture();
    setForeTexture(fTex);
    setHindTexture(hTex);
    return () => {
      fTex?.dispose();
      hTex?.dispose();
    };
  }, []);

  const forewingShape = useMemo(() => createForewingShape(), []);
  const hindwingShape = useMemo(() => createHindwingShape(), []);
  const leftAntennaCurve = useMemo(() => createAntennaCurve(true), []);
  const rightAntennaCurve = useMemo(() => createAntennaCurve(false), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Organic flapping frequency: ~8.5 Hz with natural stroke acceleration
    const flapFreq = 8.5;
    const flapPhase = t * flapFreq;

    // Asymmetric stroke: fast downstroke (lift), smooth recovery upstroke
    const rawFlap = Math.sin(flapPhase);
    const flap = Math.pow(Math.abs(rawFlap), 0.9) * (rawFlap >= 0 ? 1 : -1) * 0.78;

    // Aero-elastic wing camber (pitch twist during stroke)
    const forePitch = Math.cos(flapPhase) * 0.18;

    // Hindwing flaps with natural biological phase delay (~0.18 rad)
    const hindFlap = Math.sin(flapPhase - 0.22) * 0.68;
    const hindPitch = Math.cos(flapPhase - 0.22) * 0.14;

    // Apply rotations around wing hinge joints
    if (leftForewingRef.current) {
      leftForewingRef.current.rotation.y = flap;
      leftForewingRef.current.rotation.z = forePitch;
      leftForewingRef.current.rotation.x = Math.sin(flapPhase) * 0.08;
    }
    if (rightForewingRef.current) {
      rightForewingRef.current.rotation.y = -flap;
      rightForewingRef.current.rotation.z = -forePitch;
      rightForewingRef.current.rotation.x = Math.sin(flapPhase) * 0.08;
    }

    if (leftHindwingRef.current) {
      leftHindwingRef.current.rotation.y = hindFlap;
      leftHindwingRef.current.rotation.z = hindPitch;
    }
    if (rightHindwingRef.current) {
      rightHindwingRef.current.rotation.y = -hindFlap;
      rightHindwingRef.current.rotation.z = -hindPitch;
    }

    // Butterfly Body Kinematics & Pointer Guidance
    if (butterflyRef.current) {
      // Natural lift bobbing: body rises on downstroke, bobs naturally
      const liftBob = Math.sin(flapPhase) * 0.06;
      const hoverSway = Math.sin(t * 1.8) * 0.08;
      butterflyRef.current.position.y = liftBob + hoverSway;
      butterflyRef.current.position.x = Math.cos(t * 1.2) * 0.06;
      butterflyRef.current.position.z = Math.sin(t * 1.5) * 0.05;

      // Pointer flight steering (banks and pitches smoothly toward cursor)
      const px = lite ? 0 : state.pointer.x;
      const py = lite ? 0 : state.pointer.y;

      const targetRotY = px * 0.65;
      const targetRotX = -py * 0.45 + Math.sin(flapPhase) * 0.08; // Pitch oscillations in sync with flight
      const targetRotZ = -px * 0.32; // Banking roll into turn

      butterflyRef.current.rotation.y = THREE.MathUtils.damp(butterflyRef.current.rotation.y, targetRotY, 3.2, dt);
      butterflyRef.current.rotation.x = THREE.MathUtils.damp(butterflyRef.current.rotation.x, targetRotX, 3.2, dt);
      butterflyRef.current.rotation.z = THREE.MathUtils.damp(butterflyRef.current.rotation.z, targetRotZ, 3.2, dt);
    }
  });

  // Physical Wing Material (Translucent membrane with high clearcoat iridescence)
  const wingPhysicalProps = {
    roughness: 0.22,
    metalness: 0.12,
    transmission: 0.28,
    thickness: 0.04,
    ior: 1.52,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.98,
  };

  return (
    <group ref={butterflyRef} scale={1.42} rotation={[0.22, 0, 0]}>
      {/* ================= BIOLOGICAL ANATOMY: BODY ================= */}
      <group>
        {/* Head */}
        <mesh position={[0, 0.42, 0.02]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color="#111116" roughness={0.85} metalness={0.1} />
        </mesh>

        {/* Large Compound Eyes (Glossy dark lustrous facets) */}
        <mesh position={[-0.052, 0.44, 0.055]}>
          <sphereGeometry args={[0.032, 18, 18]} />
          <meshPhysicalMaterial color="#0a0a0f" roughness={0.12} metalness={0.5} clearcoat={1} />
        </mesh>
        <mesh position={[0.052, 0.44, 0.055]}>
          <sphereGeometry args={[0.032, 18, 18]} />
          <meshPhysicalMaterial color="#0a0a0f" roughness={0.12} metalness={0.5} clearcoat={1} />
        </mesh>

        {/* Coiled Proboscis (Feeding tube) */}
        <mesh position={[0, 0.38, 0.08]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.024, 0.006, 12, 24, Math.PI * 1.5]} />
          <meshStandardMaterial color="#1a1a22" roughness={0.7} />
        </mesh>

        {/* Long Curved Clavate Antennae with Bulbous Tips */}
        <group position={[0, 0.47, 0.04]}>
          {/* Left Antenna */}
          <mesh>
            <tubeGeometry args={[leftAntennaCurve, 28, 0.0065, 8, false]} />
            <meshStandardMaterial color="#0e0e12" roughness={0.8} />
          </mesh>
          <mesh position={[-0.28, 0.52, 0.22]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshStandardMaterial color="#1c1c24" roughness={0.6} />
          </mesh>

          {/* Right Antenna */}
          <mesh>
            <tubeGeometry args={[rightAntennaCurve, 28, 0.0065, 8, false]} />
            <meshStandardMaterial color="#0e0e12" roughness={0.8} />
          </mesh>
          <mesh position={[0.28, 0.52, 0.22]}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshStandardMaterial color="#1c1c24" roughness={0.6} />
          </mesh>
        </group>

        {/* Velvety Chitin Thorax */}
        <mesh position={[0, 0.22, 0]} rotation={[0.1, 0, 0]}>
          <capsuleGeometry args={[0.08, 0.26, 16, 24]} />
          <meshStandardMaterial color="#16171d" roughness={0.9} metalness={0.08} />
        </mesh>

        {/* Segmented Abdomen (8 tapering biological rings) */}
        <group position={[0, 0.05, -0.02]} rotation={[-0.12, 0, 0]}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((seg) => {
            const progress = seg / 7;
            const radius = 0.075 * (1 - progress * 0.55);
            const yPos = -seg * 0.075;
            return (
              <mesh key={seg} position={[0, yPos, progress * -0.04]}>
                <sphereGeometry args={[radius, 16, 14]} />
                <meshStandardMaterial
                  color={seg % 2 === 0 ? "#14151b" : "#1a1b22"}
                  roughness={0.88}
                  metalness={0.05}
                />
              </mesh>
            );
          })}
        </group>

        {/* Slender Folded Legs (Tucked naturally under thorax) */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.06, 0.2, -0.04]}>
            {/* Front Leg */}
            <mesh position={[0, 0, 0]} rotation={[0.4, side * 0.3, side * 0.6]}>
              <cylinderGeometry args={[0.005, 0.004, 0.18, 6]} />
              <meshStandardMaterial color="#0a0a0e" roughness={0.9} />
            </mesh>
            {/* Mid Leg */}
            <mesh position={[0, -0.06, 0]} rotation={[0.1, side * 0.4, side * 0.7]}>
              <cylinderGeometry args={[0.005, 0.004, 0.2, 6]} />
              <meshStandardMaterial color="#0a0a0e" roughness={0.9} />
            </mesh>
            {/* Hind Leg */}
            <mesh position={[0, -0.12, 0]} rotation={[-0.3, side * 0.3, side * 0.8]}>
              <cylinderGeometry args={[0.005, 0.004, 0.22, 6]} />
              <meshStandardMaterial color="#0a0a0e" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 4 INDEPENDENT ANATOMICAL WINGS ================= */}
      {/* 1. LEFT FOREWING */}
      <group ref={leftForewingRef} position={[-0.04, 0.22, 0.04]}>
        <mesh position={[-0.01, 0, 0]}>
          <shapeGeometry args={[forewingShape]} />
          <meshPhysicalMaterial
            map={foreTexture ?? undefined}
            color="#ffffff"
            {...wingPhysicalProps}
          />
        </mesh>
      </group>

      {/* 2. RIGHT FOREWING */}
      <group ref={rightForewingRef} position={[0.04, 0.22, 0.04]}>
        <group scale={[-1, 1, 1]}>
          <mesh position={[-0.01, 0, 0]}>
            <shapeGeometry args={[forewingShape]} />
            <meshPhysicalMaterial
              map={foreTexture ?? undefined}
              color="#ffffff"
              {...wingPhysicalProps}
            />
          </mesh>
        </group>
      </group>

      {/* 3. LEFT HINDWING */}
      <group ref={leftHindwingRef} position={[-0.04, 0.12, 0.01]}>
        <mesh position={[-0.01, 0, 0]}>
          <shapeGeometry args={[hindwingShape]} />
          <meshPhysicalMaterial
            map={hindTexture ?? undefined}
            color="#ffffff"
            {...wingPhysicalProps}
          />
        </mesh>
      </group>

      {/* 4. RIGHT HINDWING */}
      <group ref={rightHindwingRef} position={[0.04, 0.12, 0.01]}>
        <group scale={[-1, 1, 1]}>
          <mesh position={[-0.01, 0, 0]}>
            <shapeGeometry args={[hindwingShape]} />
            <meshPhysicalMaterial
              map={hindTexture ?? undefined}
              color="#ffffff"
              {...wingPhysicalProps}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function ButterflyScene({
  lite = false,
  active = true,
}: {
  lite?: boolean;
  active?: boolean;
}) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 4.8], fov: 38 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
      aria-hidden="true"
    >
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[-4, 4, 3]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={3} color="#38bdf8" position={[4, -2, 2]} scale={[5, 3, 1]} />
      </Environment>

      {/* Natural Ambient & Sun Directional Lighting */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-3, -2, 3]} intensity={1.2} color="#a6c8ff" />
      <pointLight position={[0, 0, 2.5]} intensity={6} color="#38bdf8" />

      {/* Biological Specimen */}
      <RealisticButterfly lite={lite} />
    </Canvas>
  );
}
