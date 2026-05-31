import type { Theme } from "./types.js";
import { defaultTheme } from "./default.js";

// Dark theme — zinc/neutral scale (shadcn/ui aligned)
// Semantic colors use Tailwind -400 scale: lighter/softer on dark bg
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    primary: "#fafafa", // zinc-50
    onPrimary: "#09090b", // zinc-950
    secondary: "#a1a1aa", // zinc-400
    onSecondary: "#09090b", // zinc-950
    background: "#09090b", // zinc-950
    foreground: "#fafafa", // zinc-50
    surface: "#18181b", // zinc-900
    border: "#27272a", // zinc-800
    muted: "#27272a", // zinc-800  — muted background in dark
    mutedForeground: "#a1a1aa", // zinc-400 — muted text in dark
    success: "#4ade80", // green-400
    error: "#f87171", // red-400
    info: "#60a5fa", // blue-400
    warning: "#fbbf24", // amber-400
  },
};
