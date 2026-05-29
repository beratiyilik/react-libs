"use client";
import { styled } from "styled-components";
import type { ChangeEvent } from "react";

export type ToggleSwitchProps = {
  selected: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 45px;
  height: 25.5px;
`;

const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledSlider = styled.span<{ $checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ $checked }) => ($checked ? "#2196F3" : "#ccc")};
  transition: 0.4s;
  border-radius: 25.5px;

  &:before {
    position: absolute;
    content: "";
    height: 19.5px;
    width: 19.5px;
    left: ${({ $checked }) => ($checked ? "4px" : "21.5px")};
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const ToggleSwitch = ({ selected, onChange }: ToggleSwitchProps) => (
  <StyledLabel>
    <StyledInput type="checkbox" checked={selected} onChange={onChange} />
    <StyledSlider $checked={selected} />
  </StyledLabel>
);
