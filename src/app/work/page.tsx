import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { WorkPortfolioView } from "./WorkPortfolioView";

export const metadata: Metadata = {
  title: "Studio Portfolio & Case Studies — Website Club",
  description:
    "Explore our archive of 3D spatial flagships, custom WebGL hardware launches, and interactive concept experiences engineered to push the boundaries of digital craft.",
};

export default function WorkPage() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />
      <main id="main">
        <WorkPortfolioView />
      </main>
      <Footer />
    </>
  );
}
