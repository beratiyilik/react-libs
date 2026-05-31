import path from "path";
import { fileURLToPath } from "url";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../../");

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      // Point directly to source — no build step needed for dev
      "@beratiyilik/react-components": path.join(root, "packages/react-components/src/index.ts"),
      "@beratiyilik/react-table": path.join(root, "packages/react-table/src/index.ts"),
    };
    // .js imports in NodeNext source files resolve to .ts/.tsx
    viteConfig.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js"],
    };
    return viteConfig;
  },
};

export default config;
