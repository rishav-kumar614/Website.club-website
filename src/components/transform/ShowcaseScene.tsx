"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, type ElementRef } from "react";
import * as THREE from "three";
import { PINS, type ShowcaseShape } from "./showcase-pins";

export type Shape = ShowcaseShape;
export type Finish = "matte" | "satin" | "chrome";
export type View = { az: number; pol: number; key: number };

const DARK = "#14151c";

function Body({ finish, color }: { finish: Finish; color: string }) {
  if (finish === "chrome") return <meshStandardMaterial color={color} metalness={1} roughness={0.1} envMapIntensity={1.5} />;
  if (finish === "satin")
    return <meshPhysicalMaterial color={color} metalness={0.35} roughness={0.28} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.2} />;
  return <meshPhysicalMaterial color={color} roughness={0.62} metalness={0.05} clearcoat={0.25} />;
}

function Headphones({ finish, color }: { finish: Finish; color: string }) {
  return (
    <group position={[0, -0.1, 0]}>
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[1.12, 0.075, 18, 72, Math.PI]} />
        <Body finish={finish} color={color} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.12, 0.1, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.52, 0.52, 0.34, 48]} />
            <Body finish={finish} color={color} />
          </mesh>
          <mesh position={[s * -0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.36, 0.13, 20, 40]} />
            <meshStandardMaterial color={DARK} roughness={0.9} />
          </mesh>
          <mesh position={[s * 0.18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <circleGeometry args={[0.34, 40]} />
            <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Speaker({ finish, color }: { finish: Finish; color: string }) {
  return (
    <group position={[0, -0.1, 0]}>
      <mesh>
        <cylinderGeometry args={[0.82, 0.82, 1.9, 64]} />
        <Body finish={finish} color={color} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.835, 0.835, 1.1, 64]} />
        <meshStandardMaterial color={DARK} roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.52, 0.05, 16, 64]} />
        <meshStandardMaterial color="#8fb0ff" emissive="#4f74f5" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0, -0.97, 0]}>
        <cylinderGeometry args={[0.7, 0.8, 0.1, 64]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Watch({ finish, color }: { finish: Finish; color: string }) {
  return (
    <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <mesh position={[0, 1.2, -0.02]}>
        <RoundedBox args={[0.78, 1.25, 0.16]} radius={0.07} smoothness={3}>
          <meshStandardMaterial color={DARK} roughness={0.85} />
        </RoundedBox>
      </mesh>
      <mesh position={[0, -1.2, -0.02]}>
        <RoundedBox args={[0.78, 1.25, 0.16]} radius={0.07} smoothness={3}>
          <meshStandardMaterial color={DARK} roughness={0.85} />
        </RoundedBox>
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.32, 64]} />
        <Body finish={finish} color={color} />
      </mesh>
      <mesh position={[0, 0, 0.17]}>
        <torusGeometry args={[0.8, 0.045, 16, 72]} />
        <Body finish="chrome" color="#e6e9f5" />
      </mesh>
      <mesh position={[0, 0, 0.165]}>
        <circleGeometry args={[0.72, 64]} />
        <meshStandardMaterial color="#0b0c12" roughness={0.3} metalness={0.4} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[Math.sin((i / 12) * Math.PI * 2) * 0.6, Math.cos((i / 12) * Math.PI * 2) * 0.6, 0.175]} rotation={[0, 0, -(i / 12) * Math.PI * 2]}>
          <boxGeometry args={[0.025, i % 3 === 0 ? 0.11 : 0.06, 0.01]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#ffffff" : "#6f7690"} />
        </mesh>
      ))}
      <mesh position={[0.05, 0.16, 0.185]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.045, 0.34, 0.012]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.08, 0.02, 0.19]} rotation={[0, 0, 1.25]}>
        <boxGeometry args={[0.045, 0.46, 0.012]} />
        <meshBasicMaterial color="#8fa8ff" />
      </mesh>
      <mesh position={[0.86, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
        <Body finish="chrome" color="#e6e9f5" />
      </mesh>
    </group>
  );
}

/** Projects each hotspot to screen space every frame and moves the matching DOM pin (no React roots inside the canvas). */
function PinProjector({ shape, container }: { shape: Shape; container: React.RefObject<HTMLDivElement | null> }) {
  const v = useRef(new THREE.Vector3());
  useFrame((state) => {
    const root = container.current;
    if (!root) return;
    const { camera, size } = state;
    const cam = camera.position;
    PINS[shape].forEach((pin, i) => {
      const el = root.children[i] as HTMLElement | undefined;
      if (!el) return;
      v.current.set(pin.p[0], pin.p[1], pin.p[2]);
      // hide a pin once its point is on the far side of the model
      const facing = v.current.clone().normalize().dot(cam.clone().normalize());
      v.current.project(camera);
      el.style.transform = `translate(${(v.current.x * 0.5 + 0.5) * size.width}px, ${(-v.current.y * 0.5 + 0.5) * size.height}px)`;
      el.style.opacity = facing > -0.15 ? "1" : "0";
    });
  });
  return null;
}

/** Moves the orbit camera to a requested view, and stops as soon as the user grabs the model. */
function ViewRig({ view, controls }: { view: View; controls: React.RefObject<ElementRef<typeof OrbitControls> | null> }) {
  const goal = useRef<View | null>(null);
  useEffect(() => {
    if (view.key) goal.current = view;
  }, [view]);

  useFrame((_, dt) => {
    const c = controls.current;
    const g = goal.current;
    if (!c || !g) return;
    const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
    const az = c.getAzimuthalAngle();
    const pol = c.getPolarAngle();
    const daz = wrap(g.az - az);
    c.setAzimuthalAngle(az + daz * (1 - Math.exp(-6 * dt)));
    c.setPolarAngle(THREE.MathUtils.damp(pol, g.pol, 6, dt));
    c.update();
    if (Math.abs(daz) < 0.01 && Math.abs(pol - g.pol) < 0.01) goal.current = null;
  });

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const stop = () => (goal.current = null);
    c.addEventListener("start", stop);
    return () => c.removeEventListener("start", stop);
  }, [controls]);
  return null;
}

export default function ShowcaseScene(props: {
  shape: Shape;
  finish: Finish;
  color: string;
  spin: boolean;
  view: View;
  pins: React.RefObject<HTMLDivElement | null>;
  lite: boolean;
  active: boolean;
}) {
  const { lite, active, shape, finish, color, spin, view, pins } = props;
  const controls = useRef<ElementRef<typeof OrbitControls>>(null);

  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0.5, 6.4], fov: 34 }}
      gl={{ antialias: !lite, alpha: true }}
      frameloop={active ? "always" : "demand"}
    >
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={7} position={[-5, 4, 4]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} color="#5E8BFF" position={[5, -2, 3]} scale={[6, 4, 1]} />
        <Lightformer form="ring" intensity={4} position={[0, 5, -4]} scale={4} />
        <Lightformer form="rect" intensity={2.2} position={[0, 0, -9]} scale={[22, 12, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[0, -6, 2]} scale={[18, 4, 1]} />
      </Environment>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 6]} intensity={1.8} />

      <group>
        {shape === "phones" && <Headphones finish={finish} color={color} />}
        {shape === "speaker" && <Speaker finish={finish} color={color} />}
        {shape === "watch" && <Watch finish={finish} color={color} />}
      </group>

      {/* round studio plinth */}
      <mesh position={[0, -1.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.3, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.55} />
      </mesh>
      <ContactShadows position={[0, -1.77, 0]} opacity={0.4} blur={2.4} scale={8} far={4} />

      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        enableDamping
        minPolarAngle={0.2}
        maxPolarAngle={2.2}
        autoRotate={spin}
        autoRotateSpeed={1.4}
      />
      <ViewRig view={view} controls={controls} />
      <PinProjector shape={shape} container={pins} />
    </Canvas>
  );
}
