import { definePreview } from "@storybook/react-vite";
import { parameters as docsParameters } from "@storybook/addon-docs/preview";
import { ThemeProvider } from "styled-components";
import { defaultTheme, darkTheme } from "@beratiyilik/react-components";

const themeMap = {
  light: defaultTheme,
  dark: darkTheme,
} as const;

export default definePreview({
  globalTypes: {
    theme: {
      name: "Theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    ...docsParameters,
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: defaultTheme.colors.background },
        { name: "dark", value: darkTheme.colors.background },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
      },
      defaultViewport: "desktop",
    },
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals["theme"] as keyof typeof themeMap | undefined;
      const theme = themeMap[selectedTheme ?? "light"] ?? defaultTheme;
      return (
        <ThemeProvider theme={theme}>
          <div
            style={{
              backgroundColor: theme.colors.background,
              minHeight: "100%",
              padding: "1rem",
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
});
