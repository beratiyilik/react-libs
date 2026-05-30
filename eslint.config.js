import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
  { ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**", "**/storybook-static/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["packages/*/src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/internal/*", "**/internal"],
              message: "Internal modules are not part of the public API.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["apps/storybook/src/**/*.{ts,tsx}", "apps/storybook/.storybook/**/*.{ts,tsx}"],
    rules: {},
  },
);
