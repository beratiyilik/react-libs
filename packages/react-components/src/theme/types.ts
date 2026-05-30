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
};
