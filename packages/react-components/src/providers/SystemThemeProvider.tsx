"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../theme/default.js";
import { darkTheme } from "../theme/dark.js";

const getPrefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

export type SystemThemeProviderProps = {
  children: ReactNode;
};

export const SystemThemeProvider = ({ children }: SystemThemeProviderProps) => {
  const [isDark, setIsDark] = useState(getPrefersDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>{children}</ThemeProvider>;
};
