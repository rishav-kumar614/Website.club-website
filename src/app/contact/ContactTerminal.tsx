"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LINES, type LineId } from "./lines";
import dynamic from "next/dynamic";
import { Logo } from "@/components/ui/Logo";
import type { RobotState } from "./Robot";

// WebGL robot: client only
const Robot = dynamic(() => import("./Robot").then((m) => m.Robot), { ssr: false });
import "./contact.css";

export function ContactTerminal() {
  const [started, setStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [subText, setSubText] = useState("");

  const textTargetRef = useRef<HTMLSpanElement>(null);
  const stageFrameRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const soundEnabledRef = useRef(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isTypingRef = useRef(false);
  const startedRef = useRef(false);
  const currentScaleRef = useRef(1);

  soundEnabledRef.current = soundEnabled;
  startedRef.current = started;

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    return audioCtxRef.current;
  };

  const playBlip = (freq = 480, type: OscillatorType = "sine", duration = 0.03, vol = 0.05) => {
    if (!soundEnabledRef.current) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  };

  const playStartupChime = () => {
    if (!soundEnabledRef.current) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();
      const notes = [440, 660, 880];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          playBlip(freq, "triangle", 0.1, 0.06);
        }, i * 85);
      });
    } catch {}
  };

  const toggleSound = () => {
    if (soundEnabledRef.current) voiceRef.current?.pause();
    setSoundEnabled((prev) => !prev);
  };

  const applyTransform = (tiltX: number, tiltY: number) => {
    if (stageFrameRef.current) {
      stageFrameRef.current.style.transform = `translate(-50%, -50%) scale(${currentScaleRef.current}) perspective(1400px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
    }
  };

  useEffect(() => {
    const resizeStage = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const baseW = 1920;
      const baseH = 912;
      currentScaleRef.current = Math.max(vw / baseW, vh / baseH) * 1.05;
      applyTransform(0, 0);
    };

    resizeStage();
    window.addEventListener("resize", resizeStage);
    return () => window.removeEventListener("resize", resizeStage);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = e.clientX / innerWidth - 0.5;
      const normY = e.clientY / innerHeight - 0.5;

      applyTransform(normX * 3.5, normY * 2.5);

      robotRef.current?.style.setProperty("--ex", String(normX * 16));
      robotRef.current?.style.setProperty("--ey", String(normY * 10));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const flash = (cls: string, ms: number) => {
    const el = robotRef.current;
    if (!el) return;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), ms);
  };
  const blinkEyes = () => flash("blink", 160);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startedRef.current) return;
      const r = Math.random();
      if (r > 0.8) flash("wink", 900);
      else if (r > 0.4) blinkEyes();
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const triggerEasterEgg = () => {
    flash("wink", 900);
    playBlip(980, "sine", 0.15, 0.08);
  };

  const typeMessage = (message: string, callback?: () => void) => {
    isTypingRef.current = true;
    setTyping(true);
    setChoicesVisible(false);
    if (textTargetRef.current) {
      textTargetRef.current.textContent = "";
    }
    let index = 0;

    const step = () => {
      if (index < message.length) {
        if (textTargetRef.current) {
          textTargetRef.current.textContent += message.charAt(index);
        }
        const charCode = message.charCodeAt(index);
        if (charCode > 32 && Math.random() > 0.35) {
          playBlip(320 + (charCode % 14) * 28, "triangle", 0.03);
        }
        index++;
        setTimeout(step, Math.random() * 18 + 18);
      } else {
        isTypingRef.current = false;
        setTyping(false);
        if (callback) callback();
      }
    };
    step();
  };

  // One voice for everything: Viraj (ElevenLabs) via /api/speak. Silent if the key is missing or sound is off.
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const speak = async (text: string) => {
    voiceRef.current?.pause();
    if (!soundEnabledRef.current) return;
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const url = URL.createObjectURL(await res.blob());
      const audio = new Audio(url);
      voiceRef.current = audio;
      audio.onplay = () => setSpeaking(true);
      audio.onpause = () => setSpeaking(false);
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      await audio.play();
    } catch {}
  };
  const say = (id: LineId, done?: () => void) => {
    speak(LINES[id]);
    typeMessage(LINES[id], done);
  };

  // Real conversation: the visitor's question goes to /api/chat, the answer is typed and spoken
  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const ask = async (text: string, fallback?: LineId) => {
    const q = text.trim();
    if (!q || isTypingRef.current || thinking) return;
    voiceRef.current?.pause();
    setQuestion("");
    setSubText(q);
    setChoicesVisible(false);
    setThinking(true);
    historyRef.current.push({ role: "user", content: q });
    if (textTargetRef.current) textTargetRef.current.textContent = "";

    let reply = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyRef.current }),
      });
      if (res.ok) reply = (await res.json()).reply ?? "";
    } catch {}
    setThinking(false);

    if (!reply) {
      // no AI key or network trouble: still answer something useful
      reply = fallback
        ? LINES[fallback]
        : "My brain is offline right now. Write to hello@websiteclub.com and a human will answer.";
    } else {
      historyRef.current.push({ role: "assistant", content: reply });
    }
    speak(reply);
    typeMessage(reply, () => setChoicesVisible(true));
  };

  const toggleMic = () => {
    if (listening) { recognitionRef.current?.stop(); return; }
    type SR = { lang: string; interimResults: boolean; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; onerror: () => void; start: () => void; stop: () => void };
    const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) { setQuestion(""); return; }
    voiceRef.current?.pause();
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e) => ask(e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  // Lisa's intro: greeting types out, blurs into the margin, then the real question appears with the choices
  const playIntro = () => {
    setSubText("");
    say("greeting", () => {
      setTimeout(() => {
        setSubText(LINES.greeting);
        say("followUp", () => setChoicesVisible(true));
      }, 900);
    });
  };

  const startOrInteract = () => {
    if (!started) {
      setStarted(true);
      playStartupChime();
      playIntro();
    } else {
      flash("wink", 900);
      flash("hop", 600);
      playBlip(560, "sine", 0.04);
    }
  };

  const PILLS: [string, string, LineId][] = [
    ["Start a project", "I'd like to start a project. What happens next?", "project"],
    ["Rent a 3D website", "How does renting a 3D website work, and what does it cost?", "rent"],
    ["Transform my site", "Can you add 3D to my existing website without rebuilding it?", "transform"],
    ["Ask a technical question", "How do you keep 3D websites fast on mobile?", "tech"],
  ];

  const resetDialogue = () => {
    if (isTypingRef.current) return;
    setStarted(true);
    playStartupChime();
    setChoicesVisible(false);
    playIntro();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@websiteclub.com");
    setToastVisible(true);
    playBlip(750, "sine", 0.08);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!startedRef.current && textTargetRef.current) {
        textTargetRef.current.textContent = "";
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const robotState: RobotState = listening ? "listening" : thinking ? "thinking" : speaking || typing ? "talking" : "idle";

  return (
    <div className={`lisa-page ${started ? "lisa-started" : ""}`}>
      {/* Minimal Header */}
      <header className="header">
        <Logo />

        {/* Minimalist Center Glyph */}
        <div className="center-glyph" onClick={triggerEasterEgg} title="Blink">
          <svg className="glyph-svg" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 16L12 8M12 16L7 8M32 16L37 8M37 16L32 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 12C12 6.5 17 2 22 2C27 2 32 6.5 32 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 12H39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <a href="mailto:hello@websiteclub.com" className="nav-contact">
          Let's talk
        </a>
      </header>

      {/* Main Stage on Warm Website Club Canvas (#f4f3ef) */}
      <main className="lisa-stage" id="stage">
        {/* Coordinate-locked 1920x912 frame */}
        <div className="stage-frame" id="stage-frame" ref={stageFrameRef}>
          {/* Figure is centred until the visitor starts, then slides right to make room for the dialogue */}
          <div className={`stage-shift ${started ? "" : "centered"}`}>
            <div className="robot-wrap">
              <div
                ref={robotRef}
                className="robot"
                data-state={robotState}
                role="button"
                tabIndex={0}
                aria-label={started ? "Website Club assistant robot" : "Start talking to the assistant"}
                onClick={startOrInteract}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && startOrInteract()}
              >
                <Robot host={robotRef} state={robotState} started={started} />
              </div>
            </div>
          </div>
        </div>

        {/* Left Minimalist Dialogue HUD */}
        <div className="dialogue-hud">
          <p className="hud-eyebrow">
            <span className="hud-dot" />✦ WEBSITE CLUB ASSISTANT
          </p>
          <div className={`sub-intro ${subText ? "show" : ""}`} id="sub-intro" aria-hidden="true">
            {subText}
          </div>

          <div className="main-speech">
            <span id="typewriter-text" ref={textTargetRef}></span>
            {thinking && <span className="thinking">thinking…</span>}
            <span className="cursor-block" id="cursor"></span>
          </div>

          <div className={`choices-row ${choicesVisible ? "visible" : ""}`} id="choices-box">
            {PILLS.map(([label, q, fb]) => (
              <button key={label} className="pill-btn" onClick={() => ask(q, fb)}>
                {label}
              </button>
            ))}
            <form
              className="ask-form"
              onSubmit={(e) => {
                e.preventDefault();
                ask(question);
              }}
            >
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={listening ? "Listening…" : "Ask me anything…"}
                maxLength={300}
                aria-label="Ask the assistant a question"
              />
              <button type="button" className={`ask-mic ${listening ? "on" : ""}`} onClick={toggleMic} aria-label="Speak your question">
                ●
              </button>
              <button type="submit" className="ask-send" disabled={!question.trim()} aria-label="Send question">
                →
              </button>
            </form>
            <span className="write-us">
              Write us: <a href="mailto:hello@websiteclub.com">hello@websiteclub.com</a>
              <button type="button" className="copy-mini" onClick={copyEmail} aria-label="Copy email address">
                ⧉
              </button>
            </span>
          </div>
        </div>
      </main>

      {/* Bottom Left: Restart Button */}
      <button className="btn-reset" onClick={resetDialogue} title="Restart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12C4 7.58172 7.58172 4 12 4C15.8553 4 19.0713 6.72523 19.8243 10.3478M20 12C20 16.4183 16.4183 20 12 20C8.14467 20 4.92873 17.2748 4.17572 13.6522"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 5V11H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Bottom Right: Sound Control */}
      <div className="sound-widget">
        <button className="sound-btn" id="sound-btn" onClick={toggleSound} title="Toggle Audio">
          <span id="sound-icon">{soundEnabled ? "🔊" : "🔇"}</span>
        </button>
      </div>

      {/* Minimal Clipboard Toast */}
      <div className={`toast ${toastVisible ? "show" : ""}`} id="toast">
        Copied hello@websiteclub.com to clipboard!
      </div>
    </div>
  );
}
