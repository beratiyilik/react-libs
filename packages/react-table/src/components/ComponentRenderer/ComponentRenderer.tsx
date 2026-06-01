"use client";
import type { ReactNode } from "react";

export const ComponentRenderer = ({
  component,
  row,
}: {
  component: ReactNode | ((row: Record<string, unknown>) => ReactNode);
  row?: Record<string, unknown>;
}): ReactNode => {
  if (typeof component === "function") return component(row ?? {});
  if (typeof component === "string") return <>{component}</>;
  return component ?? null;
};
