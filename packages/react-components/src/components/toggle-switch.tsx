"use client";
import type { ChangeEvent } from "react";
import {
  StyledToggleSwitchLabel,
  StyledToggleSwitchInput,
  StyledToggleSwitchSlider,
} from "./toggle-switch.styled.js";

export type ToggleSwitchSize = "sm" | "md" | "lg";

export type ToggleSwitchProps = {
  selected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: ToggleSwitchSize;
};

export const ToggleSwitch = ({ selected, onChange, size = "md" }: ToggleSwitchProps) => (
  <StyledToggleSwitchLabel $size={size}>
    <StyledToggleSwitchInput type="checkbox" checked={selected} onChange={onChange} />
    <StyledToggleSwitchSlider $checked={selected} $size={size} />
  </StyledToggleSwitchLabel>
);
