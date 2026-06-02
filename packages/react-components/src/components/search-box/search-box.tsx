"use client";
import { forwardRef, useId, useState, type HTMLAttributes } from "react";
import { useTheme } from "styled-components";
import {
  StyledSearchBoxContainer,
  StyledSearchBoxLabel,
  StyledSearchBoxInput,
} from "./search-box.styles.js";
import type { ControlSize } from "../../theme/types.js";

export type SearchBoxSize = ControlSize;

export type SearchBoxProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  size?: SearchBoxSize;
  fluid?: boolean;
  passive?: boolean;
};

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(function SearchBox(
  {
    value,
    onChange,
    placeholder = "Search…",
    label,
    size,
    fluid = false,
    passive = false,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const resolvedSize = size ?? theme.control.defaultSize;

  const inputId = useId();
  const [internal, setInternal] = useState("");

  if (passive) return null;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const handleChange = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const computedAriaLabel = label === undefined ? (ariaLabel ?? placeholder) : ariaLabel;

  return (
    <StyledSearchBoxContainer $size={resolvedSize} $fluid={fluid} {...rest}>
      {label !== undefined && (
        <StyledSearchBoxLabel htmlFor={inputId} $size={resolvedSize}>
          {label}
        </StyledSearchBoxLabel>
      )}
      <StyledSearchBoxInput
        ref={ref}
        id={inputId}
        type="search"
        value={currentValue}
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target.value)}
        aria-label={computedAriaLabel}
      />
    </StyledSearchBoxContainer>
  );
});
