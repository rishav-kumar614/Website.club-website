"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ========================================================================
   1. 4x4 MATRIX MATH (Row-Major 4x4 Arrays for exact 3D transformations)
   ======================================================================== */
function identityMatrix(tx = 0, ty = 0, tz = 0): number[] {
  return [
    1, 0, 0, tx,
    0, 1, 0, ty,
    0, 0, 1, tz,
    0, 0, 0, 1,
  ];
}

function multiply4x4(A: number[] | Float32Array, B: number[] | Float32Array): Float32Array {
  const C = new Float32Array(16);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      C[r * 4 + c] =
        A[r * 4 + 0] * B[0 * 4 + c] +
        A[r * 4 + 1] * B[1 * 4 + c] +
        A[r * 4 + 2] * B[2 * 4 + c] +
        A[r * 4 + 3] * B[3 * 4 + c];
    }
  }
  return C;
}

function rotationMatrix(axis: "x" | "y" | "z", rad: number): number[] {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const R = identityMatrix();
  if (axis === "x") {
    R[5] = c;  R[6] = -s;
    R[9] = s;  R[10] = c;
  } else if (axis === "y") {
    R[0] = c;  R[2] = s;
    R[8] = -s; R[10] = c;
  } else if (axis === "z") {
    R[0] = c;  R[1] = -s;
    R[4] = s;  R[5] = c;
  }
  return R;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ========================================================================
   2. STICKER DEFINITIONS FOR WEBSITE CLUB
   ======================================================================== */
// Front face (z = +1): "WEB ✦ CLUB"
const FRONT_STICKERS = [
  { l: "W", bg: "#E4262D", tc: "#F6CF1D" },
  { l: "E", bg: "#FBFAF6", tc: "#E4262D" },
  { l: "B", bg: "#F6CF1D", tc: "#E4262D" },
  { l: "✦", bg: "#2563B0", tc: "#FBFAF6" },
  { l: "3", bg: "#E4262D", tc: "#FBFAF6" },
  { l: "D", bg: "#F6CF1D", tc: "#2563B0" },
  { l: "C", bg: "#FBFAF6", tc: "#2563B0" },
  { l: "L", bg: "#2563B0", tc: "#F6CF1D" },
  { l: "B", bg: "#E4262D", tc: "#FBFAF6" },
];

// Top face (y = -1): "SPATIAL ✦"
const TOP_STICKERS = [
  { l: "S", bg: "#FBFAF6", tc: "#E4262D" },
  { l: "P", bg: "#2563B0", tc: "#FBFAF6" },
  { l: "A", bg: "#F6CF1D", tc: "#141414" },
  { l: "T", bg: "#E4262D", tc: "#F6CF1D" },
  { l: "I", bg: "#FBFAF6", tc: "#2563B0" },
  { l: "A", bg: "#E4262D", tc: "#FBFAF6" },
  { l: "✦", bg: "#F6CF1D", tc: "#E4262D" },
  { l: "3", bg: "#2563B0", tc: "#F6CF1D" },
  { l: "D", bg: "#FBFAF6", tc: "#141414" },
];

// Right face (x = +1): "STUDIO ✦ UX"
const RIGHT_STICKERS = [
  { l: "S", bg: "#F6CF1D", tc: "#2563B0" },
  { l: "T", bg: "#E4262D", tc: "#FBFAF6" },
  { l: "U", bg: "#2563B0", tc: "#F6CF1D" },
  { l: "D", bg: "#FBFAF6", tc: "#E4262D" },
  { l: "I", bg: "#F6CF1D", tc: "#141414" },
  { l: "O", bg: "#2563B0", tc: "#FBFAF6" },
  { l: "✦", bg: "#E4262D", tc: "#F6CF1D" },
  { l: "U", bg: "#FBFAF6", tc: "#2563B0" },
  { l: "X", bg: "#F6CF1D", tc: "#E4262D" },
];

interface CubieData {
  x0: number;
  y0: number;
  z0: number;
  el: HTMLDivElement;
  M: number[] | Float32Array;
}

// Word layouts on the 3x3 front face (reading order, "" = blank filler sticker)
const WORD_LAYOUTS: Record<string, string[]> = {
  RENT: ["R", "E", "", "N", "T", "", "", "", ""],
  BUILD: ["B", "U", "I", "L", "D", "", "", "", ""],
  TRANSFORM: ["T", "R", "A", "N", "S", "F", "O", "R", "M"],
};
// blank filler stickers use the plain cube colors (never black)
const FILLER_COLORS = ["#1F9D5B", "#F2721C", "#F6CF1D", "#FBFAF6"];
const WORD_COLORS = [
  { bg: "#E4262D", tc: "#F6CF1D" },
  { bg: "#FBFAF6", tc: "#2563B0" },
  { bg: "#F6CF1D", tc: "#E4262D" },
  { bg: "#2563B0", tc: "#FBFAF6" },
];

export interface RubiksCubeProps {
  className?: string;
  autoPlay?: boolean;
  /** Cycle these words on the front face: solved -> scramble -> solve -> next word. */
  words?: string[];
  onWord?: (index: number) => void;
}

export function RubiksCube({ className = "", autoPlay = true, words, onWord }: RubiksCubeProps) {
  const onWordRef = useRef(onWord);
  onWordRef.current = onWord;
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const frontStickersRef = useRef<HTMLDivElement[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  const [statusText, setStatusText] = useState("Solved · WEBSITE CLUB");
  const [statusDotColor, setStatusDotColor] = useState("#1F9D5B");
  const [isInteractiveDrag, setIsInteractiveDrag] = useState(false);

  // Mutable state refs to prevent re-renders in tight animation loops
  const cubiesRef = useRef<CubieData[]>([]);
  const isTurningRef = useRef(false);
  const manualScrambleRef = useRef(false);
  const isLoopRunningRef = useRef(true);
  const sPixelsRef = useRef(80);

  // Orbit rotation refs
  const baseRotX = -24;
  const baseRotY = -36;
  const currentRotXRef = useRef(baseRotX);
  const currentRotYRef = useRef(baseRotY);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const velXRef = useRef(0);
  const velYRef = useRef(0);
  const isInertiaRef = useRef(false);
  const isReturningRef = useRef(false);
  const rafOrbitRef = useRef<number | null>(null);

  // Helper to measure --s in pixels
  const measureS = useCallback(() => {
    if (probeRef.current) {
      const w = probeRef.current.getBoundingClientRect().width;
      if (w > 0) sPixelsRef.current = w;
    }
  }, []);

  const renderCubie = useCallback((c: CubieData, overrideM?: number[] | Float32Array) => {
    const M = overrideM || c.M;
    const s = sPixelsRef.current;
    const tx = M[3] * s;
    const ty = M[7] * s;
    const tz = M[11] * s;

    c.el.style.transform = `matrix3d(
      ${M[0].toFixed(6)}, ${M[4].toFixed(6)}, ${M[8].toFixed(6)}, 0,
      ${M[1].toFixed(6)}, ${M[5].toFixed(6)}, ${M[9].toFixed(6)}, 0,
      ${M[2].toFixed(6)}, ${M[6].toFixed(6)}, ${M[10].toFixed(6)}, 0,
      ${tx.toFixed(2)}, ${ty.toFixed(2)}, ${tz.toFixed(2)}, 1
    )`;
  }, []);

  const renderAllCubies = useCallback(() => {
    cubiesRef.current.forEach((c) => renderCubie(c));
  }, [renderCubie]);

  // Turn a layer with easeInOutCubic animation
  const turnLayer = useCallback(
    (axis: "x" | "y" | "z", layer: number, dir: number, durationMs: number): Promise<void> => {
      return new Promise((resolve) => {
        isTurningRef.current = true;

        const targetCubies = cubiesRef.current.filter((c) => {
          let pos: number;
          if (axis === "x") pos = Math.round(c.M[3]);
          else if (axis === "y") pos = Math.round(c.M[7]);
          else pos = Math.round(c.M[11]);
          return pos === layer;
        });

        const startTime = performance.now();
        const targetRad = dir * (Math.PI / 2);

        function step(now: number) {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / durationMs, 1);
          const eased = easeInOutCubic(t);
          const currentRad = targetRad * eased;
          const R = rotationMatrix(axis, currentRad);

          targetCubies.forEach((c) => {
            const tempM = multiply4x4(R, c.M);
            renderCubie(c, tempM);
          });

          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            const finalR = rotationMatrix(axis, targetRad);
            targetCubies.forEach((c) => {
              const nextM = multiply4x4(finalR, c.M);
              for (let i = 0; i < 16; i++) {
                nextM[i] = Math.round(nextM[i]);
              }
              c.M = nextM;
              renderCubie(c);
            });
            isTurningRef.current = false;
            resolve();
          }
        }
        requestAnimationFrame(step);
      });
    },
    [renderCubie]
  );

  // Manual scramble trigger button
  const handleScrambleClick = useCallback(() => {
    if (isTurningRef.current) return;
    manualScrambleRef.current = true;
  }, []);

  useEffect(() => {
    const pivot = pivotRef.current;
    const stage = stageRef.current;
    if (!pivot || !stage) return;

    measureS();

    // 1. Build the 26 cubies DOM
    pivot.innerHTML = "";
    cubiesRef.current = [];
    frontStickersRef.current = [];

    const faceDirs = [
      { name: "front", dx: 0, dy: 0, dz: 1 },
      { name: "back", dx: 0, dy: 0, dz: -1 },
      { name: "right", dx: 1, dy: 0, dz: 0 },
      { name: "left", dx: -1, dy: 0, dz: 0 },
      { name: "top", dx: 0, dy: -1, dz: 0 },
      { name: "bottom", dx: 0, dy: 1, dz: 0 },
    ];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // Skip core center

          const el = document.createElement("div");
          el.className = "cubie";

          faceDirs.forEach((f) => {
            const faceEl = document.createElement("div");
            faceEl.className = "face face-" + f.name;

            const isOutward =
              (f.dx && f.dx === x) || (f.dy && f.dy === y) || (f.dz && f.dz === z);

            if (isOutward) {
              const sticker = document.createElement("div");
              sticker.className = "sticker";

              if (f.name === "front" && z === 1) {
                const idx = (y + 1) * 3 + (x + 1);
                const item = FRONT_STICKERS[idx] || { l: "", bg: "#E4262D", tc: "#FBFAF6" };
                sticker.textContent = item.l;
                sticker.style.backgroundColor = item.bg;
                sticker.style.color = item.tc;
                frontStickersRef.current[idx] = sticker;
              } else if (f.name === "top" && y === -1) {
                const idx = (z + 1) * 3 + (x + 1);
                const item = TOP_STICKERS[idx] || { l: "", bg: "#FBFAF6", tc: "#141414" };
                sticker.textContent = item.l;
                sticker.style.backgroundColor = item.bg;
                sticker.style.color = item.tc;
                if (item.l === "✦") sticker.classList.add("star-glyph");
              } else if (f.name === "right" && x === 1) {
                const idx = (y + 1) * 3 + (1 - z);
                const item = RIGHT_STICKERS[idx] || { l: "", bg: "#F6CF1D", tc: "#2563B0" };
                sticker.textContent = item.l;
                sticker.style.backgroundColor = item.bg;
                sticker.style.color = item.tc;
                if (item.l === "✦") sticker.classList.add("star-glyph");
              } else if (f.name === "back" && z === -1) {
                sticker.style.backgroundColor = "#F2721C";
              } else if (f.name === "left" && x === -1) {
                sticker.style.backgroundColor = "#1F9D5B";
              } else if (f.name === "bottom" && y === 1) {
                sticker.style.backgroundColor = "#F6CF1D";
              }
              faceEl.appendChild(sticker);
            } else {
              // hidden inner face: shows when a layer turns, so keep it light instead of black
              faceEl.classList.add("inner");
            }
            el.appendChild(faceEl);
          });

          pivot.appendChild(el);

          cubiesRef.current.push({
            x0: x,
            y0: y,
            z0: z,
            el: el,
            M: identityMatrix(x, y, z),
          });
        }
      }
    }

    renderAllCubies();

    // 2. Resize Listener
    const handleResize = () => {
      measureS();
      renderAllCubies();
    };
    window.addEventListener("resize", handleResize);

    // 3. Pointer Orbit Events
    function applyOrbit(rx: number, ry: number) {
      if (pivot) {
        pivot.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      isInertiaRef.current = false;
      isReturningRef.current = false;
      setIsInteractiveDrag(true);
      stage.setPointerCapture(e.pointerId);
      startXRef.current = lastXRef.current = e.clientX;
      startYRef.current = lastYRef.current = e.clientY;
      velXRef.current = 0;
      velYRef.current = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      const dy = e.clientY - lastYRef.current;
      lastXRef.current = e.clientX;
      lastYRef.current = e.clientY;

      velXRef.current = dx;
      velYRef.current = dy;

      currentRotYRef.current += dx * 0.45;
      currentRotXRef.current -= dy * 0.45;
      currentRotXRef.current = Math.max(-85, Math.min(85, currentRotXRef.current));
      applyOrbit(currentRotXRef.current, currentRotYRef.current);
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsInteractiveDrag(false);
      isInertiaRef.current = true;
    };

    stage.addEventListener("pointerdown", handlePointerDown);
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerup", handlePointerUp);
    stage.addEventListener("pointercancel", handlePointerUp);

    // 4. Orbit RAF Loop (Idle sway + Inertia decay + Smooth Return)
    function orbitLoop(timestamp: number) {
      if (!isDraggingRef.current) {
        if (isInertiaRef.current) {
          velXRef.current *= 0.92;
          velYRef.current *= 0.92;
          currentRotYRef.current += velXRef.current * 0.45;
          currentRotXRef.current -= velYRef.current * 0.45;
          currentRotXRef.current = Math.max(-85, Math.min(85, currentRotXRef.current));
          applyOrbit(currentRotXRef.current, currentRotYRef.current);

          if (Math.abs(velXRef.current) < 0.08 && Math.abs(velYRef.current) < 0.08) {
            isInertiaRef.current = false;
            isReturningRef.current = true;
          }
        } else if (isReturningRef.current) {
          let diffY = (baseRotY - currentRotYRef.current) % 360;
          if (diffY > 180) diffY -= 360;
          if (diffY < -180) diffY += 360;

          const diffX = baseRotX - currentRotXRef.current;

          currentRotXRef.current += diffX * 0.08;
          currentRotYRef.current += diffY * 0.08;
          applyOrbit(currentRotXRef.current, currentRotYRef.current);

          if (Math.abs(diffX) < 0.1 && Math.abs(diffY) < 0.1) {
            currentRotXRef.current = baseRotX;
            currentRotYRef.current = baseRotY;
            isReturningRef.current = false;
          }
        } else {
          // Gentle organic sine sway: ±5° on X, ±12° on Y
          const swayX = baseRotX + Math.sin(timestamp * 0.0012) * 5;
          const swayY = baseRotY + Math.cos(timestamp * 0.0009) * 12;
          applyOrbit(swayX, swayY);
        }
      }
      rafOrbitRef.current = requestAnimationFrame(orbitLoop);
    }

    rafOrbitRef.current = requestAnimationFrame(orbitLoop);

    // 5. Scramble / Solve Loop
    isLoopRunningRef.current = autoPlay;

    const AXES: Array<"x" | "y" | "z"> = ["x", "y", "z"];
    const LAYERS = [-1, 0, 1];
    const DIRS = [1, -1];

    function getRandomMove(prevMove: { axis: string; layer: number; dir: number } | null) {
      let axis: "x" | "y" | "z", layer: number, dir: number;
      do {
        axis = AXES[Math.floor(Math.random() * AXES.length)];
        layer = LAYERS[Math.floor(Math.random() * LAYERS.length)];
        dir = DIRS[Math.floor(Math.random() * DIRS.length)];
      } while (prevMove && prevMove.axis === axis && prevMove.layer === layer);
      return { axis, layer, dir };
    }

    const ws = wordsRef.current;
    function applyWord(i: number) {
      if (!ws?.length) return;
      const word = ws[i % ws.length];
      const layout = WORD_LAYOUTS[word.toUpperCase()] ?? [...word.toUpperCase()];
      frontStickersRef.current.forEach((el, idx) => {
        const c = WORD_COLORS[(idx + i) % WORD_COLORS.length];
        el.textContent = layout[idx] ?? "";
        el.style.backgroundColor = layout[idx] ? c.bg : FILLER_COLORS[(idx + i) % FILLER_COLORS.length];
        el.style.color = c.tc;
      });
    }
    let wordIdx = 0;
    applyWord(0);
    const solvedLabel = () => (ws?.length ? `Solved · ${ws[wordIdx % ws.length]}` : "Solved · WEBSITE CLUB");

    function delay(ms: number) {
      return new Promise<void>((resolve) => {
        const start = performance.now();
        function check(now: number) {
          if (manualScrambleRef.current || !isLoopRunningRef.current) {
            resolve();
            return;
          }
          if (now - start >= ms) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        }
        requestAnimationFrame(check);
      });
    }

    async function runLoop() {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        setStatusText(solvedLabel());
        setStatusDotColor("#1F9D5B");
        pivot?.classList.add("solved");
        return;
      }

      let isFirstCycle = true;

      while (isLoopRunningRef.current) {
        // 1. SOLVED STATE
        pivot?.classList.add("solved");
        setStatusText(solvedLabel());
        setStatusDotColor("#1F9D5B");
        onWordRef.current?.(wordIdx % (ws?.length || 1));

        const holdTime = isFirstCycle ? 4500 : 3400;
        isFirstCycle = false;

        await delay(holdTime);
        if (!isLoopRunningRef.current) break;

        // scramble starts from the word on show; the next word is swapped in while scrambled, then the solve builds it
        pivot?.classList.remove("solved");

        // 2. SCRAMBLE (14 random moves)
        const moveHistory: Array<{ axis: "x" | "y" | "z"; layer: number; dir: number }> = [];
        let prevMove: { axis: "x" | "y" | "z"; layer: number; dir: number } | null = null;
        manualScrambleRef.current = false;

        const TOTAL_MOVES = 14;
        for (let i = 0; i < TOTAL_MOVES; i++) {
          if (!isLoopRunningRef.current) break;
          const move = getRandomMove(prevMove);
          prevMove = move;
          moveHistory.push(move);

          const moveNum = String(i + 1).padStart(2, "0");
          setStatusText(`Scrambling (${moveNum}/${TOTAL_MOVES})`);
          setStatusDotColor("#E4262D");

          await turnLayer(move.axis, move.layer, move.dir, 290);
        }

        if (!isLoopRunningRef.current) break;

        // 3. THINKING PAUSE (900ms)
        setStatusText("Thinking… computing matrix solve");
        setStatusDotColor("#F6CF1D");
        // the cube is fully scrambled and unreadable: fade the front stickers out, change the word, fade back in.
        // The solve below then resolves into the NEXT word (no abrupt swap on a solved cube).
        if (ws?.length) {
          const els = frontStickersRef.current;
          els.forEach((el) => {
            el.style.transition = "opacity 0.25s ease";
            el.style.opacity = "0";
          });
          await delay(280);
          wordIdx = (wordIdx + 1) % ws.length;
          applyWord(wordIdx);
          els.forEach((el) => {
            el.style.opacity = "1";
          });
          await delay(620);
        } else {
          await delay(900);
        }

        if (!isLoopRunningRef.current) break;

        // 4. SOLVE (Inverted moves in reverse order)
        const solveMoves = [...moveHistory].reverse().map((m) => ({
          axis: m.axis,
          layer: m.layer,
          dir: -m.dir,
        }));

        for (let j = 0; j < solveMoves.length; j++) {
          if (!isLoopRunningRef.current) break;
          const sm = solveMoves[j];
          const moveNum = String(j + 1).padStart(2, "0");
          setStatusText(`Solving (${moveNum}/${TOTAL_MOVES})`);
          setStatusDotColor("#F6CF1D");

          await turnLayer(sm.axis, sm.layer, sm.dir, 460);
          if (j < solveMoves.length - 1) {
            await delay(60);
          }
        }
      }
    }

    runLoop();

    // Cleanup
    return () => {
      isLoopRunningRef.current = false;
      window.removeEventListener("resize", handleResize);
      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", handlePointerUp);
      stage.removeEventListener("pointercancel", handlePointerUp);
      if (rafOrbitRef.current) cancelAnimationFrame(rafOrbitRef.current);
    };
  }, [measureS, renderAllCubies, turnLayer, autoPlay]);

  return (
    <div className={`cube-component-wrapper ${className}`}>
      {/* Hidden probe for measuring --s in px */}
      <div ref={probeRef} id="s-probe" aria-hidden="true" />

      {/* 3D Rubik's Cube Stage */}
      <div
        ref={stageRef}
        className={`cube-stage ${isInteractiveDrag ? "is-dragging" : ""}`}
        role="region"
        aria-label="Interactive 3D Rubik's Cube"
      >
        <div className="floor-shadow" aria-hidden="true" />
        <div ref={pivotRef} className="cube-pivot">
          {/* 26 cubies dynamically generated by React useEffect */}
        </div>
      </div>

      {/* Drag Hint */}
      <div className="hint-text">Drag cube to rotate in 3D · Auto scrambles &amp; solves</div>

      {/* Minimal Floating Status & Controls */}
      <div className="cube-controls">
        <div className="status-indicator">
          <span
            className="status-dot"
            style={{ backgroundColor: statusDotColor }}
            aria-hidden="true"
          />
          <span>{statusText}</span>
        </div>
        <button
          className="btn-scramble"
          type="button"
          onClick={handleScrambleClick}
          aria-label="Scramble Rubik's Cube"
        >
          Scramble ↻
        </button>
      </div>
    </div>
  );
}
