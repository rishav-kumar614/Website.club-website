const ITEMS = [
  "Live in 48 hours",
  "$0 upfront",
  "60 FPS on mobile",
  "Custom GLSL shaders",
  "Cloudflare edge CDN",
  "Cancel anytime",
  "Own the code after 12 months",
];

/** CSS-only infinite marquee, pauses on hover. */
export function RentTicker() {
  const row = ITEMS.map((t) => (
    <span key={t} className="rent-ticker-item">
      <i aria-hidden="true">✦</i>
      {t}
    </span>
  ));
  return (
    <div className="rent-ticker" aria-label="Rental highlights">
      <div className="rent-ticker-track">
        <div className="rent-ticker-row">{row}</div>
        <div className="rent-ticker-row" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}
