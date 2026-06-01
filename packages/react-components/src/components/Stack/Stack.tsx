"use client";
import type { HTMLAttributes } from "react";
import type { Theme } from "../../theme/types.js";
import { StyledStack } from "./Stack.styles.js";

export type StackDirection = "row" | "column";
export type StackGap = keyof Theme["spacing"];
export type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: StackDirection;
  gap?: StackGap;
};

export const Stack = ({ direction = "column", gap = "md", ...rest }: StackProps) => {
  return <StyledStack $direction={direction} $gap={gap} {...rest} />;
};
