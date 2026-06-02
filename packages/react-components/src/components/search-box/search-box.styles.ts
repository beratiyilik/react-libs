import { styled } from "styled-components";
import type { ControlSize } from "../../theme/types.js";
import { controlBase } from "../../internal/control-base.js";

export const StyledSearchBoxContainer = styled.div<{ $size: ControlSize; $fluid: boolean }>`
  ${({ $size }) => controlBase($size)}
  gap: ${({ theme, $size }) => theme.control[$size].gap};
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.border};
  width: ${({ $fluid }) => ($fluid ? "100%" : "fit-content")};
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledSearchBoxLabel = styled.label<{ $size: ControlSize }>`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;
`;

export const StyledSearchBoxInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  transition: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;
