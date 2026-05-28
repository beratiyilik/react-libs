"use client";

import { styled } from "styled-components";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
  return <StyledButton $variant={variant} {...rest} />;
};
