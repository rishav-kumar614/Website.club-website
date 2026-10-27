import { limited } from "../_rate";
import { resolveWebsiteAnswer, WEBSITE_SYSTEM_PROMPT } from "@/lib/assistant-knowledge";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-5-5";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (limited(req, 20)) return Response.json({ error: "Too many requests" }, { status: 429 });

  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad JSON" }, { status: 400 });
  }

  // trust nothing from the client: last 10 turns, plain strings, capped length
  const messages = (body.messages ?? [])
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Expected a user message" }, { status: 400 });
  }

  const latestUserMsg = messages[messages.length - 1].content;
  const key = process.env.ANTHROPIC_API_KEY;

  // If no AI key is configured, answer directly using the website data resolver
  if (!key) {
    const reply = resolveWebsiteAnswer(latestUserMsg);
    return Response.json({ reply });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 250, system: WEBSITE_SYSTEM_PROMPT, messages }),
    });

    if (res.ok) {
      const data = (await res.json()) as { content?: { type: string; text?: string }[] };
      const reply = data.content?.filter((c) => c.type === "text").map((c) => c.text).join(" ").trim();
      if (reply) return Response.json({ reply });
    }
  } catch {}

  // Fallback to verified website data if remote model errors
  return Response.json({ reply: resolveWebsiteAnswer(latestUserMsg) });
}

