import { definePreview } from "@storybook/react-vite";
import { parameters as docsParameters } from "@storybook/addon-docs/preview";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@beratiyilik/react-components";

export default definePreview({
  parameters: {
    ...docsParameters,
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: defaultTheme.colors.background },
        { name: "dark", value: "#111111" },
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
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
});
