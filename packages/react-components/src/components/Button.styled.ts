import { styled } from "styled-components";
import type { ButtonVariant } from "./Button.js";

export const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid transparent;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 1.5;
  transition:
    background-color 150ms ease,
    opacity 150ms ease;
  background-color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.onPrimary : theme.colors.foreground};
  border-color: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.primary : theme.colors.border};
  &:hover:not(:disabled) {
    opacity: 0.85;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
