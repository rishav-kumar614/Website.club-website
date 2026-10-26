import { redirect } from "next/navigation";

// ponytail: no per-template detail pages yet, send to the rental catalog
export default function TemplatePage() {
  redirect("/rent");
}
