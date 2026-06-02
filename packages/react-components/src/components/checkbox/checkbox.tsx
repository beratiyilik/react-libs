"use client";
import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import { useTheme } from "styled-components";
import {
  StyledCheckboxWrapper,
  StyledCheckboxInput,
  StyledCheckboxIcon,
  StyledCheckboxLabel,
} from "./checkbox.styles.js";
import type { ControlSize } from "../../theme/types.js";

export type CheckboxSize = ControlSize;

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  size?: CheckboxSize;
  label?: string;
};

const iconSize: Record<ControlSize, number> = { xs: 8, sm: 10, md: 12, lg: 14, xl: 16 };

const CheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2 6l3 3 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Checkbox = ({
  checked,
  onChange,
  indeterminate = false,
  size,
  label,
  disabled = false,
  id,
  ...rest
}: CheckboxProps) => {
  const theme = useTheme();
  const resolvedSize = size ?? theme.control.defaultSize;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputId] = useState(() => id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked = checked ?? false;
  const px = iconSize[resolvedSize];

  const box = (
    <StyledCheckboxWrapper
      $size={resolvedSize}
      $checked={isChecked}
      $indeterminate={indeterminate}
      $disabled={disabled}
    >
      <StyledCheckboxInput
        ref={inputRef}
        type="checkbox"
        id={inputId}
        checked={isChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : isChecked}
        onChange={({ target }) => onChange?.(target.checked)}
        {...rest}
      />
      <StyledCheckboxIcon>
        {indeterminate ? (
          <IndeterminateIcon size={px} />
        ) : isChecked ? (
          <CheckIcon size={px} />
        ) : null}
      </StyledCheckboxIcon>
    </StyledCheckboxWrapper>
  );

  if (!label) return box;

  return (
    <StyledCheckboxLabel htmlFor={inputId}>
      {box}
      {label}
    </StyledCheckboxLabel>
  );
};
