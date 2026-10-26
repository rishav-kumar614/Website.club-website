"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { TransformHero } from "@/components/transform/TransformHero";
import { ExplodedStack } from "@/components/transform/ExplodedStack";
import { ScrollFlip } from "@/components/transform/ScrollFlip";
import { ShowcaseViewer } from "@/components/transform/ShowcaseViewer";
import { IntegrationDiagram } from "@/components/transform/IntegrationDiagram";
import { TransformCase } from "@/components/transform/TransformCase";
import "./transform.css";
import "./transform-interactive.css";
import "./transform-flip.css";
import "./transform-hero.css";
import "./transform-viewer.css";
import "./transform-case.css";

const STEPS = [
  { day: "Day 1–2", title: "Audit", text: "We review your site, brand and analytics, then pick where 3D earns attention." },
  { day: "Day 3–5", title: "Prototype", text: "You get a working 3D prototype on a private preview link to react to." },
  { day: "Day 6–9", title: "Integrate", text: "We embed the layers into your live codebase as drop-in components." },
  { day: "Day 10", title: "Launch", text: "Profiled on real devices, then shipped. Your URLs and SEO stay untouched." },
];

const STACKS = ["Shopify", "WordPress", "Webflow", "Next.js"];

const FAQS = [
  {
    q: "How does 3D get added without rebuilding our site?",
    a: "We build the 3D as self-contained components or edge scripts that mount on top of your existing pages. Your CMS, checkout, routing and backend aren't touched.",
  },
  {
    q: "Will it slow down our site?",
    a: "No. Core HTML paints first and heavy 3D assets stream in afterwards, compressed with Draco and decoded off the main thread. Low-power devices get a lightweight static fallback.",
  },
  {
    q: "What assets do we need to provide?",
    a: "If you have CAD files, Blender models or 3D scans, we optimize them. If you only have product photos, we model the 3D version for you.",
  },
  {
    q: "Will it affect our Google rankings?",
    a: "Your URLs, meta tags, schema markup and text stay exactly as they are. The 3D sits on top, and richer interaction tends to keep visitors on the page longer.",
  },
  {
    q: "Can we remove it later?",
    a: "Yes. Every layer is a separate component, so you can switch any of them off without touching the rest of your site.",
  },
];

export default function TransformPage() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />

      <main id="main" className="tf">
        <TransformHero />

        {/* Exploded layers diagram */}
        <section className="section tf-layers" aria-labelledby="tf-layers-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">What we add</span>
              <h2 id="tf-layers-title" className="h2">
                Six layers. Pull them apart.
              </h2>
              <p className="lead">Rotate the stack, hover a layer, and drag the slider to see what sits on top of your site.</p>
            </div>
            <Reveal>
              <ExplodedStack />
            </Reveal>
          </div>
        </section>

        {/* Scroll-scrubbed flat to spatial */}
        <ScrollFlip />

        {/* 3D showcase */}
        <section className="section tf-showcase" aria-labelledby="tf-show-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">3D showcase</span>
              <h2 id="tf-show-title" className="h2">
                Let visitors hold the product.
              </h2>
              <p className="lead">A live WebGL viewer. Switch the model, finish and color, then drag to rotate.</p>
            </div>
            <Reveal>
              <ShowcaseViewer />
            </Reveal>
          </div>
        </section>

        {/* Integration diagram */}
        <section className="section tf-integration" aria-labelledby="tf-int-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">How it plugs in</span>
              <h2 id="tf-int-title" className="h2">
                Flip the layer on and off.
              </h2>
              <p className="lead">The 3D sits between your visitor and your site. Your backend never changes.</p>
            </div>
            <Reveal>
              <IntegrationDiagram />
            </Reveal>
          </div>
        </section>

        {/* Real before / after case study */}
        <section className="section tf-labsec" aria-labelledby="tf-case-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">Transformation in the wild</span>
              <h2 id="tf-case-title" className="h2">
                From flat PDFs to a walkable model.
              </h2>
              <p className="lead">A real project: same content, rebuilt as an experience visitors explore.</p>
            </div>
            <Reveal>
              <TransformCase />
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="section tf-process" aria-labelledby="tf-process-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker tf-kicker-dark">How it works</span>
              <h2 id="tf-process-title" className="h2">
                Live in ten days.
              </h2>
              <p className="lead">A fixed sprint with a preview link you can open from day three.</p>
            </div>

            <div className="tf-steps">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="tf-step">
                    <span className="tf-step-day">{s.day}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stacks */}
        <section className="section tf-stacks" aria-labelledby="tf-stacks-title">
          <div className="wrap tf-stacks-inner">
            <div className="tf-head tf-head-left">
              <span className="tf-kicker">Works with your stack</span>
              <h2 id="tf-stacks-title" className="h2">
                No migration on the stacks we work with.
              </h2>
              <p className="lead">
                Your CMS, checkout and hosting stay where they are. We mount the 3D on top. Running something else? Ask us.
              </p>
            </div>
            <ul className="tf-chips">
              {STACKS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section tf-faq" aria-labelledby="tf-faq-title">
          <div className="wrap tf-faq-inner">
            <div className="tf-head tf-head-left">
              <span className="tf-kicker">FAQ</span>
              <h2 id="tf-faq-title" className="h2">
                Questions before you start.
              </h2>
            </div>
            <div className="tf-faq-list">
              {FAQS.map((f) => (
                <details key={f.q} className="tf-faq-item">
                  <summary>
                    <span>{f.q}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
