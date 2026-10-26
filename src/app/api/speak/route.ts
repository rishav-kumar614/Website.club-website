import { limited } from "../_rate";

// The one voice for every answer: "Viraj - Warm, Confident & Natural Customer Care Agent" (ElevenLabs library)
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? "fPIfC3elMLbN9tNwMXkw";
const MODEL_ID = "eleven_flash_v2_5";

// ponytail: in-memory cache per server instance, so repeated lines (greeting, button answers) are paid for once
const cache = new Map<string, ArrayBuffer>();

export async function POST(req: Request) {
  if (limited(req, 30)) return new Response("Too many requests", { status: 429 });
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return new Response("Voice not configured", { status: 503 });

  let text = "";
  try { text = String((await req.json()).text ?? "").trim(); } catch {}
  if (!text || text.length > 500) return new Response("Bad text", { status: 400 });

  let audio = cache.get(text);
  if (!audio) {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_64`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: MODEL_ID }),
    });
    if (!res.ok) return new Response("Voice service error", { status: 502 });
    audio = await res.arrayBuffer();
    if (cache.size > 200) cache.clear();
    cache.set(text, audio);
  }
  return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } });
}
