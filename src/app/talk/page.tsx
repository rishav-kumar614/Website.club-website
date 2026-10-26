import type { Metadata } from "next";
import { ContactTerminal } from "../contact/ContactTerminal";

export const metadata: Metadata = {
  title: "Talk to Studio | Interactive Spatial Assistant | Website Club",
  description:
    "Communicate directly with Website Club's interactive assistant. Ask questions, explore 3D website rentals, or start a bespoke project.",
  alternates: { canonical: "/contact" },
};

export default function TalkPage() {
  return <ContactTerminal />;
}
