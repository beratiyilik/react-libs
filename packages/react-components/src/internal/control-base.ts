import { css } from "styled-components";
import type { ControlSize } from "../theme/types.js";

export const controlBase = (size: ControlSize, options?: { iconOnly?: boolean }) => css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: ${({ theme }) => theme.control[size].height};
  width: ${({ theme }) => (options?.iconOnly === true ? theme.control[size].height : "auto")};
  padding: ${({ theme }) =>
    options?.iconOnly === true ? "0" : `0 ${theme.control[size].paddingX}`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.control[size].borderRadius};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.control[size].fontSize};
  line-height: 1.5;
`;
