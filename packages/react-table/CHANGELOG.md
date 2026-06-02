# @beratiyilik/react-table

## 0.1.0-alpha.5

### Minor Changes

- ### Button: debounce, throttle, async loading, and type safety

  The `Button` component gains three new capabilities:

  - **`mode` prop** (`"normal" | "debounce" | "throttle"`, default `"normal"`) — controls how rapid clicks are handled. Pair with the **`delay`** prop (ms, default `300`) to tune the interval.
    - `"debounce"` — fires `onClick` only after the user stops clicking for `delay` ms (trailing edge).
    - `"throttle"` — fires `onClick` at most once per `delay` ms (leading edge); subsequent clicks within the window are dropped.
  - **Async `onClick`** — returning a `Promise` from `onClick` automatically sets the button into a loading state (spinner + `aria-busy`, interaction disabled) until the promise settles. No manual `loading` prop needed for async flows.
  - **`type="button"` default** — buttons no longer accidentally submit surrounding forms. Pass `type="submit"` explicitly when needed.

  ### Control sizing extended to five steps

  All interactive components (`Button`, `Checkbox`, `SearchBox`, `ToggleSwitch`) now accept the full `ControlSize` range: **`xs` | `sm` | `md` | `lg` | `xl`** (previously `sm` / `md` / `lg` only). Size tokens for the two new steps (`xs`, `xl`) are added to the theme. A shared `controlBase()` helper (in `internal/`) ensures consistent box height, padding, border-radius, and font-size across all components at every size.

  ### react-table styling aligned with new sizing system

  Table sub-components (`pagination`, `header`, `filter`, `sort`, shared styles) are updated to consume the revised control-size tokens, keeping visual consistency with the component layer.

### Patch Changes

- Updated dependencies []:
  - @beratiyilik/react-components@0.1.0-alpha.5

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

### Patch Changes

- Updated dependencies []:
  - @beratiyilik/react-components@0.1.0-alpha.4

## 0.1.0-alpha.3

### Minor Changes

- Applied TypeScript/React naming and file structure conventions across all components. Updated theme tokens and visual identity alignment.

### Patch Changes

- Updated dependencies []:
  - @beratiyilik/react-components@0.1.0-alpha.3

## 0.1.0-alpha.2

### Minor Changes

- refactor: filter toggle with inline input, pagination disabled fix, empty state for no records, debug mode for table footer, shared styled architecture, ToggleSwitch/SearchBox imported from react-components

### Patch Changes

- Updated dependencies []:
  - @beratiyilik/react-components@0.1.0-alpha.2

## 0.1.0-alpha.1

### Minor Changes

- Modularize react-table with dedicated sub-components and hooks

### Patch Changes

- Updated dependencies []:
  - @beratiyilik/react-components@0.1.0-alpha.1

## 0.1.0-alpha.0

### Minor Changes

- Initial alpha release of react-components and react-table packages. Includes Button, Stack, BrowserInfo components with styled-components theme support, and a basic Table component built on react-components.

### Patch Changes

- Updated dependencies []:
  - @beratiyilik/react-components@0.1.0-alpha.0
