# react-libs

A monorepo of typed, tree-shakeable **React 19** UI libraries built on **styled-components v6** — ESM-only, zero runtime dependencies beyond React and styled-components.

[![react-components](https://img.shields.io/npm/v/@beratiyilik/react-components?label=react-components)](https://www.npmjs.com/package/@beratiyilik/react-components)
[![react-table](https://img.shields.io/npm/v/@beratiyilik/react-table?label=react-table)](https://www.npmjs.com/package/@beratiyilik/react-table)
[![Storybook](https://img.shields.io/badge/Storybook-live%20demo-ff4785?logo=storybook&logoColor=white)](https://beratiyilik.github.io/react-libs/)
[![license](https://img.shields.io/badge/license-LGPL--3.0--or--later-blue)](./LICENSE)

> **Status:** early alpha (`0.x.0-alpha.N`). Public APIs may change between releases.

**📖 Live component explorer:** **[beratiyilik.github.io/react-libs](https://beratiyilik.github.io/react-libs/)** — every component, with controls and docs, deployed from `main`.

## Packages

| Package                                                      | Description                                                                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@beratiyilik/react-components`](packages/react-components) | UI primitives (Button, Checkbox, ToggleSwitch, SearchBox, Stack), a notification system, hooks, and a themable design-token layer.                                        |
| [`@beratiyilik/react-table`](packages/react-table)           | A generic, fully-featured `Table<T>` — sorting, per-field filtering, fuzzy search, pagination, row selection, density, loading/error states. Built on `react-components`. |

## Features

- **Typed theme contract** — every `styled.*` template gets full token autocompletion via `DefaultTheme` augmentation.
- **Light & dark themes** out of the box, plus a `SystemThemeProvider` that follows `prefers-color-scheme`.
- **Consistent control sizing** — `xs · sm · md · lg · xl` across all interactive components, driven by theme tokens.
- **ESM-only, side-effect-free, tree-shakeable** — `tsc`-emitted 1:1 module graph, `"sideEffects": false`.
- **`"use client"`-ready** components for React Server Component setups.

## Requirements

React 19+, styled-components 6+. These are **peer dependencies** — install them in your app.

## Installation

```bash
# Components only
npm install @beratiyilik/react-components react react-dom styled-components

# Table (pulls in react-components transitively)
npm install @beratiyilik/react-table react react-dom styled-components
```

## Quick start

Wrap your app in a `ThemeProvider` (from `styled-components`) with one of the exported themes:

```tsx
import { ThemeProvider } from "styled-components";
import { defaultTheme, Button } from "@beratiyilik/react-components";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button onClick={() => alert("hi")}>Click me</Button>
    </ThemeProvider>
  );
}
```

To follow the OS color scheme automatically, use `SystemThemeProvider` instead (it renders its own `ThemeProvider` and swaps `defaultTheme`/`darkTheme` on `prefers-color-scheme` changes):

```tsx
import { SystemThemeProvider } from "@beratiyilik/react-components";

<SystemThemeProvider>
  <App />
</SystemThemeProvider>;
```

## `@beratiyilik/react-components`

### Theming

Two themes ship by default: `defaultTheme` (light) and `darkTheme`. Both satisfy the exported `Theme` type, which covers `colors`, `spacing`, `radius`, `shadow`, `font`, `transition`, `breakpoints`, `zIndex`, and per-size `control`/`toggle` tokens. Pass a customized object to `ThemeProvider` to override tokens.

### Components

```tsx
import { Button, Checkbox, ToggleSwitch, SearchBox, Stack } from "@beratiyilik/react-components";
```

**Button** — variants, sizing, icon-only mode, async loading, and built-in debounce/throttle.

```tsx
<Button variant="primary" size="md" onClick={onSave}>Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive" iconOnly aria-label="Delete">🗑</Button>

{/* Async onClick auto-shows a spinner and disables the button until it resolves */}
<Button onClick={async () => await save()}>Submit</Button>

{/* Rate-limit rapid clicks */}
<Button mode="debounce" delay={300} onClick={search}>Search</Button>
<Button mode="throttle" delay={1000} onClick={refresh}>Refresh</Button>
```

| Prop       | Type                                                                | Default       |
| ---------- | ------------------------------------------------------------------- | ------------- |
| `variant`  | `"primary" \| "secondary" \| "ghost" \| "outline" \| "destructive"` | `"primary"`   |
| `size`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                              | theme default |
| `iconOnly` | `boolean`                                                           | `false`       |
| `loading`  | `boolean`                                                           | `false`       |
| `mode`     | `"normal" \| "debounce" \| "throttle"`                              | `"normal"`    |
| `delay`    | `number` (ms, for debounce/throttle)                                | `300`         |
| `onClick`  | `(e) => void \| Promise<void>`                                      | —             |

**Checkbox** — controlled, with `indeterminate` support and an optional label.

```tsx
<Checkbox checked={checked} onChange={setChecked} label="Accept terms" />
<Checkbox checked={false} indeterminate onChange={selectAll} size="sm" />
```

**ToggleSwitch** — controlled switch (`pill` or `square`).

```tsx
<ToggleSwitch selected={on} onChange={(e) => setOn(e.target.checked)} />
<ToggleSwitch selected={on} onChange={handleChange} shape="square" size="lg" />
```

**SearchBox** — controlled or uncontrolled search input; `fluid` stretches to fill its container.

```tsx
<SearchBox value={query} onChange={setQuery} label="Search" placeholder="Find users…" />
```

**Stack** — flex layout primitive using theme spacing tokens.

```tsx
<Stack direction="row" gap="md">
  <Button>One</Button>
  <Button>Two</Button>
</Stack>
```

### Notifications

Wrap once with `NotificationProvider`, then trigger toasts anywhere via `useNotification()`:

```tsx
import { NotificationProvider, useNotification } from "@beratiyilik/react-components";

function Root() {
  return (
    <NotificationProvider>
      <Page />
    </NotificationProvider>
  );
}

function Page() {
  const notify = useNotification();
  return (
    <Button onClick={() => notify.success("Saved!")}>Save</Button>
    // notify.error / notify.info / notify.warning
    // notify.show(message, type?, durationMs?) for full control; notify.hide(id) to dismiss
  );
}
```

### Hooks

```tsx
import { useDebounce, useThrottle, useLocalStorage } from "@beratiyilik/react-components";

const debounced = useDebounce(query, 300); // (value, delay = 300)
const throttled = useThrottle(scrollY, 200); // (value, interval = 200)
const [theme, setTheme] = useLocalStorage("theme", "light"); // [value, setValue]
```

### Utilities

`ComponentRenderer` renders a `ReactNode`, a render-prop function, or a string uniformly — useful when a prop may be any of those.

## `@beratiyilik/react-table`

`Table<T>` is driven entirely by an `options` object plus a `data` array. Define columns with `fieldOptions`; everything else is optional.

```tsx
import { Table, type TableOptions } from "@beratiyilik/react-table";

type User = { id: string; name: string; role: string; status: string };

const options: TableOptions<User> = {
  name: "Users",
  identifier: "id",
  searchable: true, // fuzzy full-text search (Fuse.js, debounced)
  pagination: true,
  density: "comfortable", // "compact" | "comfortable" | "spacious"
  fieldOptions: [
    { fieldName: "id", selection: true, selectionIdentifier: "id", width: "3rem" },
    { fieldName: "name", headerName: "Name", sortable: true, filterable: true },
    { fieldName: "role", headerName: "Role", sortable: true, filterable: true },
    {
      fieldName: "status",
      headerName: "Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />, // custom cell
    },
  ],
};

<Table options={options} data={users} />;
```

**`FieldOption<T>`** per column: `fieldName` (required), `headerName`, `sortable`, `filterable`, `selection`, `selectionIdentifier`, `width`, `color`, and `render` for custom cells.

**`TableOptions<T>`** also supports `loading`, `error` (rendered in place of rows), `headerComponents` / `footerComponents` (`ReactNode[]` slots), and `debug`. The data flows `search → filter → sort → paginate`; row selection always operates on the original `data`.

## Development

This is a [pnpm workspaces](https://pnpm.io/workspaces) + [Turborepo](https://turbo.build/) monorepo. Requires **Node 24+** (the repo pins **24.16.0** via `.nvmrc`) and **pnpm 11+**.

```bash
pnpm install        # install everything
pnpm build          # build all packages (dependency-ordered)
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest
pnpm lint           # eslint
pnpm format         # prettier --write .
pnpm storybook:dev  # component explorer on http://localhost:6006
```

Build a single package with `pnpm --filter @beratiyilik/react-components build`. Each library compiles via `tsc` (no bundler) to an ESM-only, 1:1 `src → dist` module graph.

`pnpm storybook:dev` runs the explorer locally; on every push to `main`, CI builds it and deploys to GitHub Pages at **[beratiyilik.github.io/react-libs](https://beratiyilik.github.io/react-libs/)**.

### Repository layout

```text
packages/
  react-components/   # UI primitives, theme, hooks, notifications
  react-table/        # generic Table<T> built on react-components
apps/
  storybook/          # component explorer / living docs → deployed to GitHub Pages
```

Conventions (kebab-case files/folders, barrel files, theme typing, release flow) are documented in [ARCHITECTURE_AND_CONVENTIONS.md](ARCHITECTURE_AND_CONVENTIONS.md) and enforced by ESLint, `validate-conventions.sh`, and a pre-commit hook. Releases are automated with [Changesets](https://github.com/changesets/changesets): `feat/*` → `dev` → `main`, where merging the version PR on `main` publishes to npm with provenance.

## License

[LGPL-3.0-or-later](./LICENSE) © Berat Iyilik
