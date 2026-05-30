"use client";

import { styled } from "styled-components";
import type { HTMLAttributes } from "react";
import type { Theme } from "../theme/types.js";

export type StackDirection = "row" | "column";
export type StackGap = keyof Theme["spacing"];

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: StackDirection;
  gap?: StackGap;
};

const StyledStack = styled.div<{ $direction: StackDirection; $gap: StackGap }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
`;

export const Stack = ({ direction = "column", gap = "md", ...rest }: StackProps) => {
  return <StyledStack $direction={direction} $gap={gap} {...rest} />;
};
