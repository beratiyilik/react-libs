import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { ButtonMode } from "./button.types.js";

type UseButtonClickParams = {
  mode: ButtonMode;
  delay: number;
  disabled: boolean;
  loading: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
};

type UseButtonClickReturn = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  internalLoading: boolean;
};

export const useButtonClick = ({
  mode,
  delay,
  disabled,
  loading,
  onClick,
}: UseButtonClickParams): UseButtonClickReturn => {
  const [internalLoading, setInternalLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRanRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const executeAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    setInternalLoading(true);
    try {
      await onClick(e);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    if (mode === "debounce") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => executeAction(e), delay);
    } else if (mode === "throttle") {
      const now = Date.now();
      if (now - lastRanRef.current >= delay) {
        lastRanRef.current = now;
        executeAction(e);
      }
    } else {
      executeAction(e);
    }
  };

  return { handleClick, internalLoading };
};
