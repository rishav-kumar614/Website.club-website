import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { PerformanceDeepDive } from "./PerformanceDeepDive";

export const metadata: Metadata = {
  title: "Performance & Dual-Threaded WebGL Architecture — Website Club",
  description:
    "Zero dropped frames. 0.4s First Contentful Paint. Explore our off-main-thread Web Worker architecture, Draco mesh compression pipeline, and Core Web Vitals profiling.",
};

export default function PerformancePage() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />
      <main id="main">
        <PerformanceDeepDive />
      </main>
      <Footer />
    </>
  );
}
