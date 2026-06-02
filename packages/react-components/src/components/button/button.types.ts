import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import type { ControlSize } from "../../theme/types.js";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
export type ButtonSize = ControlSize;
export type ButtonMode = "normal" | "debounce" | "throttle";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  loading?: boolean;
  mode?: ButtonMode;
  delay?: number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  children?: ReactNode;
};
