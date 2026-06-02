import { styled } from "styled-components";
import type { ControlSize } from "../../theme/types.js";

const boxSize: Record<ControlSize, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
};

export const StyledCheckboxWrapper = styled.span<{
  $size: ControlSize;
  $checked: boolean;
  $indeterminate: boolean;
  $disabled: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  vertical-align: middle;
  overflow: hidden;
  width: ${({ $size }) => boxSize[$size]};
  height: ${({ $size }) => boxSize[$size]};
  min-width: ${({ $size }) => boxSize[$size]};
  min-height: ${({ $size }) => boxSize[$size]};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid
    ${({ theme, $checked, $indeterminate }) =>
      $checked || $indeterminate ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $checked, $indeterminate }) =>
    $checked || $indeterminate ? theme.colors.primary : theme.colors.background};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  transition:
    background-color ${({ theme }) => theme.transition.duration.fast}
      ${({ theme }) => theme.transition.easing.default},
    border-color ${({ theme }) => theme.transition.duration.fast}
      ${({ theme }) => theme.transition.easing.default};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StyledCheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: inherit;
  &:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export const StyledCheckboxIcon = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.onPrimary};
  line-height: 0;
`;

export const StyledCheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.foreground};
  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
