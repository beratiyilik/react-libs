"use client";
import type { ChangeEvent, LabelHTMLAttributes } from "react";
import { useTheme } from "styled-components";
import {
  StyledToggleSwitchLabel,
  StyledToggleSwitchInput,
  StyledToggleSwitchSlider,
} from "./toggle-switch.styles.js";
import type { ControlSize } from "../../theme/types.js";

export type ToggleSwitchSize = ControlSize;
export type ToggleSwitchShape = "pill" | "square";

export type ToggleSwitchProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, "onChange"> & {
  selected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: ToggleSwitchSize;
  shape?: ToggleSwitchShape;
};

export const ToggleSwitch = ({
  selected,
  onChange,
  size,
  shape = "pill",
  ...rest
}: ToggleSwitchProps) => {
  const theme = useTheme();
  const resolvedSize = size ?? theme.control.defaultSize;
  return (
    <StyledToggleSwitchLabel $size={resolvedSize} {...rest}>
      <StyledToggleSwitchInput type="checkbox" checked={selected} onChange={onChange} />
      <StyledToggleSwitchSlider $checked={selected} $size={resolvedSize} $shape={shape} />
    </StyledToggleSwitchLabel>
  );
};
