"use client";
import { useState, type HTMLAttributes } from "react";
import {
  StyledSearchBoxContainer,
  StyledSearchBoxLabel,
  StyledSearchBoxInput,
} from "./search-box.styled.js";

export type SearchBoxSize = "sm" | "md" | "lg";

export type SearchBoxProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  size?: SearchBoxSize;
  fluid?: boolean;
  passive?: boolean;
};

let _id = 0;
const nextId = () => `search-box-${++_id}`;

export const SearchBox = ({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  size = "md",
  fluid = false,
  passive = false,
  ...rest
}: SearchBoxProps) => {
  const [inputId] = useState(nextId);
  const [internal, setInternal] = useState("");

  if (passive) return null;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const handleChange = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <StyledSearchBoxContainer $size={size} $fluid={fluid} {...rest}>
      <StyledSearchBoxLabel htmlFor={inputId} $size={size}>
        {label}
      </StyledSearchBoxLabel>
      <StyledSearchBoxInput
        id={inputId}
        type="text"
        value={currentValue}
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target.value)}
        $size={size}
      />
    </StyledSearchBoxContainer>
  );
};
