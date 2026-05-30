import type { Theme } from "./types.js";

export const defaultTheme: Theme = {
  colors: {
    primary: "#18181b",
    onPrimary: "#ffffff",
    secondary: "#71717a",
    onSecondary: "#ffffff",
    background: "#ffffff",
    foreground: "#18181b",
    surface: "#f4f4f5",
    border: "#e4e4e7",
    muted: "#a1a1aa",
    success: "#16a34a",
    error: "#dc2626",
    info: "#2563eb",
    warning: "#d97706",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  radius: {
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
};
