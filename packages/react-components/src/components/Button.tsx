"use client";
import type { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.styled.js";

export type ButtonVariant = "primary" | "secondary";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
  return <StyledButton $variant={variant} {...rest} />;
};
