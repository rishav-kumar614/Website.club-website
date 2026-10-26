import type { Metadata } from "next";
import { ContactTerminal } from "./ContactTerminal";

export const metadata: Metadata = {
  title: "Spatial Concierge & Contact Desk | Website Club",
  description:
    "Communicate directly with Website Club's interactive spatial terminal. Inquire about 3D website rentals, bespoke flagships, or discuss WebGL architecture.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactTerminal />;
}
