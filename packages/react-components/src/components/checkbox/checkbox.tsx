"use client";
import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import {
  StyledCheckboxWrapper,
  StyledCheckboxInput,
  StyledCheckboxIcon,
  StyledCheckboxLabel,
} from "./checkbox.styles.js";

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  size?: CheckboxSize;
  label?: string;
};

const iconSize: Record<CheckboxSize, number> = { sm: 10, md: 12, lg: 14 };

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
  size = "md",
  label,
  disabled = false,
  id,
  ...rest
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputId] = useState(() => id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked = checked ?? false;
  const px = iconSize[size];

  const box = (
    <StyledCheckboxWrapper
      $size={size}
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
