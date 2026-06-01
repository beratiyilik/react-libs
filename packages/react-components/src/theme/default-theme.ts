import type { Theme } from "./types.js";

// Light theme — zinc/neutral scale (shadcn/ui aligned)
// muted   = muted BACKGROUND color (zinc-100)
// mutedForeground = muted TEXT color (zinc-500)
export const defaultTheme: Theme = {
  colors: {
    primary: "#18181b", // zinc-900
    onPrimary: "#ffffff", // white
    secondary: "#71717a", // zinc-500
    onSecondary: "#ffffff", // white
    background: "#ffffff", // white
    foreground: "#09090b", // zinc-950
    surface: "#f4f4f5", // zinc-100
    border: "#e4e4e7", // zinc-200
    muted: "#f4f4f5", // zinc-100  — muted background
    mutedForeground: "#71717a", // zinc-500 — muted text
    success: "#16a34a", // green-600
    error: "#dc2626", // red-600
    info: "#2563eb", // blue-600
    warning: "#d97706", // amber-600
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  font: {
    family:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, Oxygen, Ubuntu, sans-serif",
    size: {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  transition: {
    duration: {
      fast: "100ms",
      default: "150ms",
      slow: "300ms",
    },
    easing: {
      default: "ease",
      in: "ease-in",
      out: "ease-out",
      inOut: "ease-in-out",
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    notification: 1400,
  },
  toggle: {
    sm: { width: "2rem", height: "1.125rem", thumb: "0.75rem", thumbOffset: "0.1875rem" },
    md: { width: "2.5rem", height: "1.5rem", thumb: "1.125rem", thumbOffset: "0.1875rem" },
    lg: { width: "3.25rem", height: "2rem", thumb: "1.5rem", thumbOffset: "0.25rem" },
  },
};
