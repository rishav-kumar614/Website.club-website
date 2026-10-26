"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";

export type RobotState = "idle" | "listening" | "thinking" | "talking";

interface Props {
  /** the wrapper element: the page toggles .blink/.wink/.hop and sets --ex/--ey (cursor) on it */
  host: RefObject<HTMLDivElement | null>;
  state: RobotState;
  started: boolean;
}

const CYAN = "#37e9ff";
const FW = 640, FH = 480;

type Face = { t: number; started: boolean; state: RobotState; blink: boolean; wink: boolean; ex: number; ey: number };

/** Paints the glowing face onto the visor texture. */
function drawFace(ctx: CanvasRenderingContext2D, f: Face) {
  ctx.clearRect(0, 0, FW, FH);
  ctx.shadowColor = CYAN;
  ctx.shadowBlur = 26;
  ctx.strokeStyle = CYAN;
  ctx.fillStyle = CYAN;
  ctx.lineCap = "round";

  if (!f.started) {
    ctx.font = "700 40px 'Space Mono', monospace";
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.65 + 0.35 * Math.sin(f.t * 5);
    ctx.fillText("[CLICK] TO START", FW / 2, FH / 2 + 14);
    ctx.globalAlpha = 1;
    return;
  }

  const gx = f.ex * 3, gy = f.ey * 3; // eyes glance toward the cursor
  const big = f.state === "listening" ? 1.15 : 1;
  const scan = f.state === "thinking" ? Math.sin(f.t * 4) * 30 : 0;
  const ry = (f.blink ? 4 : 62) * big;

  ctx.lineWidth = 17;
  // right eye (ring)
  ctx.beginPath();
  ctx.ellipse(440 + gx + scan, 190 + gy, 42 * big, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  // left eye: ring, or the wink arc
  if (f.wink) {
    ctx.beginPath();
    ctx.arc(205 + gx + scan, 215 + gy, 42, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.ellipse(205 + gx + scan, 190 + gy, 42 * big, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // mouth
  const mx = 322 + gx * 0.5, my = 345 + gy * 0.5;
  ctx.lineWidth = 15;
  if (f.state === "thinking") {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(mx - 38 + i * 38, my + 8 - Math.abs(Math.sin(f.t * 6 - i * 0.7)) * 16, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (f.state === "talking") {
    const open = 6 + 30 * Math.abs(Math.sin(f.t * 13));
    ctx.beginPath();
    ctx.ellipse(mx, my + 6, 36, open, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (f.state === "listening") {
    ctx.beginPath();
    ctx.ellipse(mx, my + 6, 14, 14, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(mx, my - 28, 56, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();
  }
}

function Bot({ host, state, started }: Props) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const antL = useRef<THREE.Group>(null);
  const antR = useRef<THREE.Group>(null);
  const chest = useRef<THREE.MeshStandardMaterial>(null);
  const ears = useRef<THREE.MeshStandardMaterial>(null);
  const hopStart = useRef(-10);
  const hadHop = useRef(false);

  const { canvas, ctx, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = FW;
    canvas.height = FH;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { canvas, ctx, texture };
  }, []);

  const white = useMemo(() => ({ color: "#f1f3f6", roughness: 0.22, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08 }), []);
  const dark = useMemo(() => ({ color: "#1b1d21", roughness: 0.38, metalness: 0.25, clearcoat: 0.4 }), []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const el = host.current;
    const ex = el ? parseFloat(el.style.getPropertyValue("--ex") || "0") : 0;
    const ey = el ? parseFloat(el.style.getPropertyValue("--ey") || "0") : 0;
    const cl = el?.classList;
    const hovered = !!el?.matches(":hover");

    drawFace(ctx, { t, started, state, blink: !!cl?.contains("blink"), wink: !!cl?.contains("wink"), ex, ey });
    texture.needsUpdate = true;

    // hop on click
    const hopping = !!cl?.contains("hop");
    if (hopping && !hadHop.current) hopStart.current = t;
    hadHop.current = hopping;
    const hp = Math.min(1, (t - hopStart.current) / 0.6);
    const hop = hp < 1 ? Math.sin(hp * Math.PI) * 0.45 : 0;

    const k = 1 - Math.exp(-dt * 6);
    if (root.current) root.current.position.y = Math.sin(t * 1.4) * 0.06 + hop;
    if (head.current) {
      head.current.rotation.y += (ex * 0.06 - head.current.rotation.y) * k;
      head.current.rotation.x += (ey * 0.05 - head.current.rotation.x) * k;
      head.current.rotation.z = Math.sin(t * 0.9) * 0.02 + (state === "thinking" ? Math.sin(t * 2) * 0.05 : 0);
    }
    if (root.current) root.current.rotation.y += (ex * 0.02 - root.current.rotation.y) * k;
    if (antL.current) antL.current.rotation.z = 0.32 + Math.sin(t * 2.2) * 0.07;
    if (antR.current) antR.current.rotation.z = -0.32 - Math.sin(t * 2.7) * 0.07;
    if (armR.current) {
      const target = hovered ? 2.4 + Math.sin(t * 12) * 0.3 : 0.22;
      armR.current.rotation.z += (target - armR.current.rotation.z) * (1 - Math.exp(-dt * 10));
    }
    if (armL.current) armL.current.rotation.z = -0.22 + Math.sin(t * 1.4 + 1) * 0.03;
    if (chest.current) chest.current.emissiveIntensity = (state === "talking" ? 2.2 : 1.4) + Math.sin(t * (state === "talking" ? 10 : 2.4)) * 0.5;
    if (ears.current) ears.current.emissiveIntensity = state === "listening" ? 1.6 + Math.sin(t * 9) * 1.1 : 1.8;
  });

  return (
    <group ref={root} position={[0, 0.05, 0]} scale={0.82}>
      {/* legs + shoes */}
      {[-0.38, 0.38].map((x) => (
        <group key={x} position={[x, -1.05, 0]}>
          <mesh>
            <capsuleGeometry args={[0.2, 0.3, 8, 16]} />
            <meshPhysicalMaterial {...white} />
          </mesh>
          <RoundedBox args={[0.7, 0.34, 0.95]} radius={0.17} smoothness={6} position={[0, -0.4, 0.12]}>
            <meshPhysicalMaterial {...dark} />
          </RoundedBox>
        </group>
      ))}

      {/* torso */}
      <RoundedBox args={[1.55, 1.45, 1.15]} radius={0.58} smoothness={8} position={[0, -0.12, 0]}>
        <meshPhysicalMaterial {...white} />
      </RoundedBox>
      <RoundedBox args={[1.05, 0.62, 0.14]} radius={0.2} smoothness={6} position={[0, -0.2, 0.55]}>
        <meshPhysicalMaterial {...dark} />
      </RoundedBox>
      <RoundedBox args={[0.72, 0.17, 0.08]} radius={0.08} smoothness={6} position={[0, -0.2, 0.63]}>
        <meshStandardMaterial ref={chest} color="#0b3a42" emissive={CYAN} emissiveIntensity={1.4} toneMapped={false} />
      </RoundedBox>
      {/* neck */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.32, 0.4, 0.3, 24]} />
        <meshPhysicalMaterial {...dark} />
      </mesh>

      {/* arms */}
      <group ref={armL} position={[-0.92, 0.38, 0]}>
        <mesh><sphereGeometry args={[0.24, 24, 24]} /><meshPhysicalMaterial {...dark} /></mesh>
        <mesh position={[-0.04, -0.45, 0]}><capsuleGeometry args={[0.19, 0.55, 8, 16]} /><meshPhysicalMaterial {...white} /></mesh>
        <mesh position={[-0.04, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.2, 0.04, 12, 28]} /><meshPhysicalMaterial {...dark} /></mesh>
        <mesh position={[-0.04, -0.98, 0]}><sphereGeometry args={[0.15, 20, 20]} /><meshPhysicalMaterial {...dark} /></mesh>
      </group>
      <group ref={armR} position={[0.92, 0.38, 0]}>
        <mesh><sphereGeometry args={[0.24, 24, 24]} /><meshPhysicalMaterial {...dark} /></mesh>
        <mesh position={[0.04, -0.45, 0]}><capsuleGeometry args={[0.19, 0.55, 8, 16]} /><meshPhysicalMaterial {...white} /></mesh>
        <mesh position={[0.04, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.2, 0.04, 12, 28]} /><meshPhysicalMaterial {...dark} /></mesh>
        <mesh position={[0.04, -0.98, 0]}><sphereGeometry args={[0.15, 20, 20]} /><meshPhysicalMaterial {...dark} /></mesh>
      </group>

      {/* head */}
      <group ref={head} position={[0, 1.75, 0]}>
        <RoundedBox args={[2.6, 2.15, 2.0]} radius={0.95} smoothness={10}>
          <meshPhysicalMaterial {...white} />
        </RoundedBox>
        {/* black glass visor + glowing face */}
        <RoundedBox args={[2.3, 1.76, 0.3]} radius={0.66} smoothness={8} position={[0, -0.02, 0.9]}>
          <meshPhysicalMaterial color="#04060a" roughness={0.04} metalness={0.3} clearcoat={1} clearcoatRoughness={0.02} envMapIntensity={1.3} />
        </RoundedBox>
        <mesh position={[0, -0.02, 1.062]}>
          <planeGeometry args={[2.12, 1.59]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
        {/* top cap */}
        <RoundedBox args={[0.8, 0.14, 0.45]} radius={0.06} smoothness={4} position={[0, 1.08, 0]}>
          <meshPhysicalMaterial {...dark} />
        </RoundedBox>
        {/* antennas */}
        <group ref={antL} position={[-0.5, 1.02, 0]}>
          <mesh position={[0, 0.38, 0]}><cylinderGeometry args={[0.035, 0.035, 0.76, 12]} /><meshPhysicalMaterial {...dark} /></mesh>
          <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.14, 24, 24]} /><meshPhysicalMaterial {...white} /></mesh>
        </group>
        <group ref={antR} position={[0.5, 1.02, 0]}>
          <mesh position={[0, 0.38, 0]}><cylinderGeometry args={[0.035, 0.035, 0.76, 12]} /><meshPhysicalMaterial {...dark} /></mesh>
          <mesh position={[0, 0.8, 0]}><sphereGeometry args={[0.14, 24, 24]} /><meshPhysicalMaterial {...white} /></mesh>
        </group>
        {/* headphones */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 1.38, -0.05, 0]}>
            <RoundedBox args={[0.38, 1.0, 0.95]} radius={0.17} smoothness={6}>
              <meshPhysicalMaterial {...dark} />
            </RoundedBox>
            <RoundedBox args={[0.06, 0.64, 0.42]} radius={0.03} smoothness={4} position={[s * 0.2, 0, 0]}>
              <meshStandardMaterial ref={s === 1 ? ears : undefined} color="#0b3a42" emissive={CYAN} emissiveIntensity={1.8} toneMapped={false} />
            </RoundedBox>
          </group>
        ))}
      </group>

    </group>
  );
}

export function Robot(props: Props) {
  return (
    <Canvas camera={{ position: [0, 1.5, 12.8], fov: 28 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: "none" }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#cfe6ff" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 5]} scale={[10, 5, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[0, -3, 4]} scale={[8, 2, 1]} />
      </Environment>
      <Bot {...props} />
    </Canvas>
  );
}
