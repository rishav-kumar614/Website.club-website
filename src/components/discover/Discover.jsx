"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_TEMPLATES } from "./heroes";
import TemplateWheel from "./TemplateWheel";

export default function Discover() {
  const root = useRef();

  useGSAP(() => {
    gsap.from(".dc-head > *", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".dc-head", start: "top 85%" } });
  }, { scope: root });

  return (
    <section id="templates" ref={root} className="sec dc">
      <div className="dc-head">
        <p className="eyebrow">Discover</p>
        <h2>Explore animated hero sections</h2>
      </div>
      <TemplateWheel templates={HERO_TEMPLATES} />
    </section>
  );
}
