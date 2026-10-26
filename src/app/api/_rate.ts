// ponytail: in-memory sliding window per IP, resets on deploy and isn't shared across instances; use Redis/Upstash if traffic grows
const hits = new Map<string, number[]>();

export function limited(req: Request, max: number, windowMs = 60_000) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}
