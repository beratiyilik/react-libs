"use client";
import type { ChangeEvent, LabelHTMLAttributes } from "react";
import {
  StyledToggleSwitchLabel,
  StyledToggleSwitchInput,
  StyledToggleSwitchSlider,
} from "./toggle-switch.styled.js";

export type ToggleSwitchSize = "sm" | "md" | "lg";
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
  size = "md",
  shape = "pill",
  ...rest
}: ToggleSwitchProps) => (
  <StyledToggleSwitchLabel $size={size} {...rest}>
    <StyledToggleSwitchInput type="checkbox" checked={selected} onChange={onChange} />
    <StyledToggleSwitchSlider $checked={selected} $size={size} $shape={shape} />
  </StyledToggleSwitchLabel>
);
