"use client";
import type { ButtonProps } from "./button.types.js";
import {
  StyledButton,
  StyledButtonContent,
  StyledSpinnerSvg,
  StyledSpinnerWrapper,
} from "./button.styles.js";
import { useButtonClick } from "./use-button-click.js";

const Spinner = () => (
  <StyledSpinnerWrapper>
    <StyledSpinnerSvg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.25}
      />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </StyledSpinnerSvg>
  </StyledSpinnerWrapper>
);

export const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  mode = "normal",
  delay = 300,
  disabled,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  const { handleClick, internalLoading } = useButtonClick({
    mode,
    delay,
    disabled: disabled ?? false,
    loading,
    ...(onClick !== undefined && { onClick }),
  });

  const isLoading = loading || internalLoading;

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $loading={isLoading}
      disabled={disabled ?? isLoading}
      aria-busy={isLoading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {isLoading && <Spinner />}
      <StyledButtonContent $loading={isLoading}>{children}</StyledButtonContent>
    </StyledButton>
  );
};
