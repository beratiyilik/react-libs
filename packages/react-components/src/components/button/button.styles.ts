import { css, keyframes, styled } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./button.js";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.font.size.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.font.size.md};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.font.size.lg};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.foreground};
    border-color: ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border-color: transparent;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surface};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    border-color: ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surface};
    }
  `,
  destructive: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: ${({ theme }) => theme.colors.error};
    &:hover:not(:disabled) {
      opacity: 0.85;
    }
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid transparent;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  font-family: ${({ theme }) => theme.font.family};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 1.5;
  transition:
    background-color ${({ theme }) => theme.transition.duration.default}
      ${({ theme }) => theme.transition.easing.default},
    opacity ${({ theme }) => theme.transition.duration.default}
      ${({ theme }) => theme.transition.easing.default};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StyledSpinnerSvg = styled.svg`
  width: 1em;
  height: 1em;
  animation: ${spin} 700ms linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation-duration: 0ms;
  }
`;
