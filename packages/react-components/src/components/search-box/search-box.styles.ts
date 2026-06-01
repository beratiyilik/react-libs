import { css, styled } from "styled-components";
import type { SearchBoxSize } from "./search-box.js";

const containerSizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    gap: ${({ theme }) => theme.spacing.xs};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    gap: ${({ theme }) => theme.spacing.md};
  `,
};

const inputSizeStyles = {
  sm: css`
    padding: ${({ theme }) => `0 ${theme.spacing.xs}`};
    font-size: ${({ theme }) => theme.font.size.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.font.size.sm};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.font.size.md};
  `,
};

export const StyledSearchBoxContainer = styled.div<{ $size: SearchBoxSize; $fluid: boolean }>`
  display: flex;
  align-items: center;
  ${({ $size }) => containerSizeStyles[$size]}
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  width: ${({ $fluid }) => ($fluid ? "100%" : "fit-content")};
`;

export const StyledSearchBoxLabel = styled.label<{ $size: SearchBoxSize }>`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme, $size }) => ($size === "lg" ? theme.font.size.md : theme.font.size.sm)};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;
`;

export const StyledSearchBoxInput = styled.input<{ $size: SearchBoxSize }>`
  ${({ $size }) => inputSizeStyles[$size]}
  flex: 1;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font-family: ${({ theme }) => theme.font.family};
  outline: none;
  transition: border-color ${({ theme }) => theme.transition.duration.fast}
    ${({ theme }) => theme.transition.easing.default};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
