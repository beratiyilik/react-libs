import js from "@eslint/js";
import tseslint from "typescript-eslint";
import checkFile from "eslint-plugin-check-file";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**", "**/storybook-static/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Restrict imports from internal modules across all packages
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
  // Enforce kebab-case for all folders under packages src
  {
    files: ["packages/*/src/**/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/folder-naming-convention": ["error", { "packages/*/src/**/": "KEBAB_CASE" }],
    },
  },
  // Enforce kebab-case for all folders under storybook src
  {
    files: ["apps/storybook/src/**/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/folder-naming-convention": ["error", { "apps/storybook/src/**/": "KEBAB_CASE" }],
    },
  },
  // Barrel files: always flat/lowercase — exempt from kebab enforcement
  {
    files: ["packages/*/src/**/index.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": ["error", { "**/index.{ts,tsx}": "FLAT_CASE" }],
    },
  },
  // Convention exceptions: test-setup, types, ambient declarations
  // These are permanently exempt from kebab-case filename enforcement
  {
    files: [
      "packages/*/src/test-setup.ts",
      "packages/*/src/**/types.ts",
      "packages/*/src/**/*.d.ts",
    ],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  // All other package source files must use kebab-case
  {
    files: ["packages/*/src/**/*.{ts,tsx}"],
    ignores: [
      "packages/*/src/**/index.{ts,tsx}",
      "packages/*/src/test-setup.ts",
      "packages/*/src/**/types.ts",
      "packages/*/src/**/*.d.ts",
    ],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  // All storybook source files must use kebab-case
  {
    files: ["apps/storybook/src/**/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
);
