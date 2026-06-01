import { styled } from "styled-components";
import type { StackDirection, StackGap } from "./stack.js";

export const StyledStack = styled.div<{ $direction: StackDirection; $gap: StackGap }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
`;
