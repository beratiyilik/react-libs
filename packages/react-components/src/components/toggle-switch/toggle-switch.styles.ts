import { styled } from "styled-components";
import type { ControlSize } from "../../theme/types.js";
import type { ToggleSwitchShape } from "./toggle-switch.js";

export const StyledToggleSwitchLabel = styled.label<{ $size: ControlSize }>`
  position: relative;
  display: inline-block;
  width: ${({ theme, $size }) => theme.toggle[$size].width};
  height: ${({ theme, $size }) => theme.toggle[$size].height};
  flex-shrink: 0;
`;

export const StyledToggleSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const StyledToggleSwitchSlider = styled.span<{
  $checked: boolean;
  $size: ControlSize;
  $shape: ToggleSwitchShape;
}>`
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  transition: background-color ${({ theme }) => theme.transition.duration.default}
    ${({ theme }) => theme.transition.easing.default};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  border-radius: ${({ theme, $shape }) =>
    $shape === "square" ? theme.radius.sm : theme.radius.lg};
  &:before {
    position: absolute;
    content: "";
    height: ${({ theme, $size }) => theme.toggle[$size].thumb};
    width: ${({ theme, $size }) => theme.toggle[$size].thumb};
    left: ${({ theme, $checked, $size }) =>
      $checked
        ? theme.toggle[$size].thumbOffset
        : `calc(100% - ${theme.toggle[$size].thumb} - ${theme.toggle[$size].thumbOffset})`};
    bottom: ${({ theme, $size }) => theme.toggle[$size].thumbOffset};
    background-color: ${({ theme }) => theme.colors.onPrimary};
    transition: left ${({ theme }) => theme.transition.duration.default}
      ${({ theme }) => theme.transition.easing.default};
    border-radius: ${({ theme, $shape }) => ($shape === "square" ? theme.radius.xs : "50%")};
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;
