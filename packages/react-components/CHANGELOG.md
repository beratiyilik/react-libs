# @beratiyilik/react-components

## 0.1.0-alpha.4

### Minor Changes

- Updated dependencies across monorepo:
  - Upgraded pnpm from 11.5.0 to 11.5.1
  - Updated Storybook ecosystem from 10.4.1 to 10.4.2 (addon-docs, react-vite, csf-plugin, react, react-dom-shim, builder-vite)
  - Bumped React from 19.2.6 to 19.2.7
  - Updated @types/react from 19.2.15 to 19.2.16
  - Upgraded internal packages (@beratiyilik/browser-utils and @beratiyilik/ts-utils) from 0.1.0-alpha.1 to 0.1.0-alpha.2
  - Updated fuse.js from 7.4.0 to 7.4.1
  - Updated Vite from 8.0.14 to 8.0.16 and Rolldown from 1.0.2 to 1.0.3
  - Added version locks to pnpm-workspace.yaml for newly updated packages to prevent unintended patch updates

## 0.1.0-alpha.3

### Minor Changes

- Applied TypeScript/React naming and file structure conventions across all components. Updated theme tokens and visual identity alignment.

## 0.1.0-alpha.2

### Minor Changes

- refactor: design system overhaul — theme tokens (onPrimary, surface, border, muted, semantic colors, shadow, font), per-component styled files, ToggleSwitch size prop (sm/md/lg), notification styled with theme, Storybook stories updated

## 0.1.0-alpha.1

### Minor Changes

- Add SearchBox, ToggleSwitch, NotificationProvider components; add useDebounce, useLocalStorage, useThrottle hooks

## 0.1.0-alpha.0

### Minor Changes

- Initial alpha release of react-components and react-table packages. Includes Button, Stack, BrowserInfo components with styled-components theme support, and a basic Table component built on react-components.
