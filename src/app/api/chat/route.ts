import { FAQ } from "@/lib/content";
import { limited } from "../_rate";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-5-5";

const SYSTEM = `You are the voice assistant on the Website Club website. Website Club is a 3D and interactive web studio.

What you can tell visitors:
- Rent: ready-made 3D flagship sites on a monthly subscription, customised with the client's brand and domain. Plans shown on the site: Maison $490/mo (restaurants and hospitality), Forma $590/mo (architecture and real estate), Orbit $690/mo (hardware and tech). No upfront build fee, launch in about 48 hours, cancel with 30 days notice, code buyout possible after 12 months.
- Build: fully custom, original 3D websites designed around a brand, product and story.
- Transform: adding a 3D/WebGL layer to an existing site (Shopify, Next.js, WordPress) without a rebuild.
- Contact: hello@websiteclub.com. Starting a project means telling the studio the timeline, budget and vision.

FAQ from the website:
${FAQ.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n")}

Rules:
- You are spoken aloud. Reply in 1 to 3 short, natural sentences. No markdown, lists, emojis or URLs read out letter by letter.
- Be warm and slightly witty, never pushy.
- Only state facts given above. If you don't know something (custom pricing, exact timelines, anything else), say so and point to hello@websiteclub.com.
- If asked something unrelated to Website Club, answer briefly and steer back.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (limited(req, 20)) return Response.json({ error: "Too many requests" }, { status: 429 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: "Chat not configured" }, { status: 503 });

  let body: { messages?: Msg[] };
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }

  // trust nothing from the client: last 10 turns, plain strings, capped length
  const messages = (body.messages ?? [])
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Expected a user message" }, { status: 400 });
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 250, system: SYSTEM, messages }),
  });
  if (!res.ok) return Response.json({ error: "Model error" }, { status: 502 });

  const data = (await res.json()) as { content?: { type: string; text?: string }[] };
  const reply = data.content?.filter((c) => c.type === "text").map((c) => c.text).join(" ").trim();
  return Response.json({ reply: reply || "Hmm, I lost my train of thought. Could you ask that again?" });
}
