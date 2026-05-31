export type Theme = {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    onSecondary: string;
    background: string;
    foreground: string;
    surface: string;
    border: string;
    muted: string;
    mutedForeground: string;
    success: string;
    error: string;
    info: string;
    warning: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    sm: string;
    md: string;
  };
  font: {
    family: string;
    size: {
      sm: string;
      md: string;
      lg: string;
    };
    weight: {
      regular: number;
      medium: number;
      semibold: number;
    };
  };
  transition: {
    duration: {
      fast: string;
      default: string;
      slow: string;
    };
    easing: {
      default: string;
      in: string;
      out: string;
      inOut: string;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    overlay: number;
    modal: number;
    notification: number;
  };
  toggle: {
    sm: { width: string; height: string; thumb: string; thumbOffset: string };
    md: { width: string; height: string; thumb: string; thumbOffset: string };
    lg: { width: string; height: string; thumb: string; thumbOffset: string };
  };
};
