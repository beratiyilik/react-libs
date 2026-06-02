import { css, keyframes, styled } from "styled-components";
import type { ButtonVariant } from "./button.types.js";
import type { ControlSize } from "../../theme/types.js";
import { controlBase } from "../../internal/control-base.js";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

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
  $size: ControlSize;
  $loading: boolean;
  $iconOnly: boolean;
}>`
  ${({ $size, $iconOnly }) => controlBase($size, { iconOnly: $iconOnly })}
  justify-content: center;
  position: relative;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition:
    background-color ${({ theme }) => theme.transition.duration.default}
      ${({ theme }) => theme.transition.easing.default},
    opacity ${({ theme }) => theme.transition.duration.default}
      ${({ theme }) => theme.transition.easing.default};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  ${({ $variant }) => variantStyles[$variant]}
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StyledButtonContent = styled.span<{ $loading: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
`;

export const StyledSpinnerWrapper = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSpinnerSvg = styled.svg`
  width: 1em;
  height: 1em;
  animation: ${spin} 700ms linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation-duration: 0ms;
  }
`;
