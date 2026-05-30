import { styled } from "styled-components";

type ToggleSize = "sm" | "md" | "lg";

const dimensions: Record<
  ToggleSize,
  { width: string; height: string; thumb: string; thumbOffset: string; thumbOn: string }
> = {
  sm: {
    width: "2rem",
    height: "1.125rem",
    thumb: "0.75rem",
    thumbOffset: "0.1875rem",
    thumbOn: "0.125rem",
  },
  md: {
    width: "2.5rem",
    height: "1.5rem",
    thumb: "1.125rem",
    thumbOffset: "0.1875rem",
    thumbOn: "0.125rem",
  },
  lg: {
    width: "3.25rem",
    height: "2rem",
    thumb: "1.5rem",
    thumbOffset: "0.25rem",
    thumbOn: "0.25rem",
  },
};

export const StyledToggleSwitchLabel = styled.label<{ $size: ToggleSize }>`
  position: relative;
  display: inline-block;
  width: ${({ $size }) => dimensions[$size].width};
  height: ${({ $size }) => dimensions[$size].height};
  flex-shrink: 0;
`;

export const StyledToggleSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const StyledToggleSwitchSlider = styled.span<{ $checked: boolean; $size: ToggleSize }>`
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  transition: background-color 150ms ease;
  border-radius: ${({ theme }) => theme.radius.lg};
  &:before {
    position: absolute;
    content: "";
    height: ${({ $size }) => dimensions[$size].thumb};
    width: ${({ $size }) => dimensions[$size].thumb};
    left: ${({ $checked, $size }) =>
      $checked
        ? dimensions[$size].thumbOffset
        : `calc(100% - ${dimensions[$size].thumb} - ${dimensions[$size].thumbOffset})`};
    bottom: ${({ $size }) => dimensions[$size].thumbOffset};
    background-color: ${({ theme }) => theme.colors.onPrimary};
    transition: left 150ms ease;
    border-radius: 50%;
  }
`;
