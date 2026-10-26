export type ShowcaseShape = "phones" | "speaker" | "watch";

/** Hotspots per model: world-space position [x, y, z] and label. Shared by the 3D scene (positions) and the DOM overlay (labels). */
export const PINS: Record<ShowcaseShape, { p: [number, number, number]; label: string }[]> = {
  phones: [
    { p: [1.55, 0, 0], label: "40mm drivers" },
    { p: [-0.78, 0, 0.2], label: "Memory-foam pads" },
    { p: [0, 1.18, 0], label: "Aluminum band" },
  ],
  speaker: [
    { p: [0, 1.1, 0.5], label: "Touch ring" },
    { p: [0.92, -0.2, 0], label: "360° drivers" },
    { p: [0.1, -1.2, 0.75], label: "20h battery" },
  ],
  watch: [
    { p: [0.25, 0.55, 0.3], label: "Sapphire glass" },
    { p: [1.05, 0.22, 0], label: "Digital crown" },
    { p: [0, -1.55, 0.1], label: "Quick-swap strap" },
  ],
};
