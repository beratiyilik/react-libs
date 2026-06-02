# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`ARCHITECTURE_AND_CONVENTIONS.md` is the canonical design/intent doc (goals, non-goals, module strategy). Consult it for "why"; this file is the operational "how".

## Commands

```bash
# All packages (turbo, dependency-ordered)
pnpm install
pnpm build          # tsc build of every package (^build first)
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest run
pnpm lint           # eslint
pnpm check          # publint + attw (attw is a no-op echo — see below)
pnpm format         # prettier --write .
pnpm format:check   # prettier --check .
pnpm clean          # per-package: rm dist/node_modules/.turbo/*.tgz/*.tsbuildinfo
pnpm clean:root     # rm root node_modules/.turbo/pnpm-lock.yaml
pnpm clean:all      # clean + clean:root

# Storybook (apps/storybook)
pnpm storybook:dev      # dev server on :6006, aliases packages to source (no build needed)
pnpm storybook:build    # static build to storybook-static/

# Single package
pnpm --filter @beratiyilik/react-components build
pnpm --filter @beratiyilik/react-table test

# Watch mode (tsc --watch across packages)
pnpm dev

# Single test file (run from the package directory)
cd packages/react-components && pnpm vitest run src/components/button/button.test.tsx

# Release
pnpm changeset          # interactive: select packages + bump type
pnpm version            # apply version bumps (changeset version)
pnpm release            # build + changeset publish (CI only)
```

The husky `pre-commit` hook (`.husky/pre-commit`) runs the **entire** gate: `build → typecheck → test → lint → format:check → check → validate-conventions.sh`. Expect commits to be slow; run pieces individually while iterating.

## Architecture

### Monorepo layout

pnpm workspaces + turborepo. `packages/*` are published libraries; `apps/*` are private tooling.

```text
@beratiyilik/react-table          (packages/react-table)
  └── @beratiyilik/react-components  (workspace:*) + fuse.js
        └── @beratiyilik/ts-utils, @beratiyilik/browser-utils  (npm, from the separate ts-libs repo)

@repo/storybook (apps/storybook, private) → depends on both packages via workspace:*
```

`react`, `react-dom`, and `styled-components` are **peer dependencies** of both packages — never direct deps. `react-table` gets `ts-utils`/`browser-utils` transitively through `react-components`.

### Build pipeline

Each package builds with `tsc -p tsconfig.build.json` — **no bundler**. Output is ESM-only, 1:1 `src/*.ts(x)` → `dist/*.js` (+ `.d.ts`, declaration maps, source maps). `dist/` is the published artifact (`"files": ["dist"]`, `"sideEffects": false`). `tsconfig.json` is editor/typecheck-only (`noEmit`); `tsconfig.build.json` sets `outDir`/`rootDir` and excludes test files.

Turbo order: `build` depends on `^build`; `test`, `typecheck`, `check:*`, `storybook:*` all depend on `^build`.

### Module resolution gotcha (NodeNext)

`moduleResolution: NodeNext` means **relative imports in source must carry a `.js` extension even though the files are `.ts`/`.tsx`** — e.g. `import { Button } from "./button.js"`. Match this everywhere. Storybook's `viteFinal` adds an `extensionAlias` (`.js` → `.ts`/`.tsx`) so it can consume source directly.

### react-components structure (`packages/react-components/src/`)

- `theme/` — `types.ts` (the `Theme` type + `ControlSize` union), `default-theme.ts`, `dark-theme.ts`, and `styled.d.ts` which augments styled-components' `DefaultTheme` so tokens are typed in every `styled.*` template. Barrel: `index.ts`.
- `providers/` — `SystemThemeProvider`: watches `prefers-color-scheme` via `matchMedia` and swaps `defaultTheme`/`darkTheme`.
- `components/` — one folder per component: `button`, `checkbox`, `search-box`, `stack`, `toggle-switch`.
- `hooks/` — `useDebounce`, `useThrottle`, `useLocalStorage`.
- `notification/` — `NotificationProvider` (context) + `useNotification()`; `notification.constants.ts` (`NotifyTypes`, `NOTIFICATION_DISPLAY_DURATION`), `notifications.tsx` (renderer), `icons/`. Wrap the app once, call `useNotification()` anywhere inside. Uses `uuid()` from `@beratiyilik/ts-utils`.
- `utilities/` — `ComponentRenderer`: renders `ReactNode | render-prop | string` uniformly.
- `internal/` — `control-base.ts` (`controlBase()` css helper). Not exported from the package root.

### Component folder + styling conventions

Each component folder has: `index.ts` (barrel), `<name>.tsx` (component), `<name>.styles.ts` (styled-components). Optionally `<name>.types.ts` (e.g. button), `<name>.test.tsx`, and co-located hooks (e.g. `button/use-button-click.ts`). Checkbox inlines its types in the `.tsx`; don't assume a types file always exists.

- Named import only: `import { styled } from "styled-components"`.
- Transient props use the `$` prefix (`$variant`, `$size`, `$checked`, `$loading`) so they don't leak to the DOM.
- Client components start with the `"use client"` directive.
- **Control sizing**: `ControlSize = "xs" | "sm" | "md" | "lg" | "xl"`. Components take an optional `size` and resolve it to `theme.control.defaultSize` when omitted (`const resolvedSize = size ?? theme.control.defaultSize`). Per-size tokens live in `theme.control[size]` (and `theme.toggle[size]`); the shared `controlBase(size, { iconOnly })` helper in `internal/` provides box/height/padding/radius/font.

### react-table structure (`packages/react-table/src/`)

`Table<T>` is generic over `T extends Record<string, unknown>` and takes `{ options: TableOptions<T>; data: T[] }`.

**Data pipeline** (inside `TableProvider`, `context/table.context.tsx`):

```text
raw data → useSearch (fuse.js fuzzy, debounced 300ms, threshold 0.3)
         → useFilters (per-field) → useSort → usePagination → processedData
```

`useSelection` operates on the **original** `data` array, not the processed slice.

- All state lives in `TableContext`; sub-components (`TopSection`, `HeaderSection`, `BodySection`, `FooterSection`, plus `body/`, `header/`, `footer/`, `pagination/`, `table-summary/`) consume it via `useTable()`. **Never pass data as props between sub-components — always go through context.**
- `FieldOption<T>` drives column config: `sortable`, `filterable`, `selection`, `width`, `render` (custom cell). `TableOptions<T>` adds `density` (`compact`/`comfortable`/`spacious`), `loading`, `error`, `searchable`, `pagination`, `identifier`, header/footer component slots.
- Search uses `fuse.js` keyed on `Object.keys(data[0])`.
- `styled/` mirrors react-components: `styled.d.ts` re-augments `DefaultTheme` by importing the `Theme` type from `@beratiyilik/react-components`.

### TypeScript config

All packages extend `tsconfig.base.json`:

- `target: ES2024`, `module`/`moduleResolution: NodeNext`, `jsx: react-jsx`
- `strict` + `noUncheckedIndexedAccess` + `noImplicitOverride` + `exactOptionalPropertyTypes` + `verbatimModuleSyntax` + `isolatedModules`
- `esModuleInterop: false` — **named imports everywhere**
- `ignoreDeprecations: "6.0"` — required for TS 6 with `esModuleInterop: false`
- emits `declaration`, `declarationMap`, `sourceMap`

## Conventions & enforcement

- **ESLint** (`eslint.config.js`, flat config) uses `eslint-plugin-check-file`: folders under `packages/*/src` and `apps/storybook/src` must be **kebab-case**, and filenames must be kebab-case too. `index.{ts,tsx}` is exempt (flat/lowercase); permanent exceptions: `test-setup.ts`, `**/types.ts`, `*.d.ts`. Note: the `no-restricted-imports` rule guarding `internal/` is currently **commented out** — internal-import discipline is by convention, not lint.
- **`validate-conventions.sh`** (run in pre-commit) enforces: (1) every non-`internal` folder containing source files has an `index.ts` barrel; (2) each `*.context.tsx` either exports a `*Provider` or has a sibling `*-provider.tsx`.

## Testing

`vitest` + `@testing-library/react` + `@testing-library/jest-dom`, `jsdom` environment, `include: src/**/*.test.{ts,tsx}`. `test-setup.ts` imports `@testing-library/jest-dom/vitest`.

Any test rendering a styled-component must wrap with `ThemeProvider` and call `cleanup()` after each test:

```tsx
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
render(<Component />, { wrapper });
```

## Storybook (`apps/storybook`, `@repo/storybook`)

Storybook 10 + `@storybook/react-vite`. Stories in `src/stories/**/*.stories.@(ts|tsx)`. Vite aliases the two packages to their `src/index.ts` (so no build is required for dev) and adds the `.js → .ts/.tsx` extension alias. A global `theme` toolbar (light/dark) plus a `ThemeProvider` decorator wrap every story. Private and **ignored by changesets**; CI builds it as a smoke check (`pnpm storybook:build`).

## Release flow

- **Pre-release mode active**: `alpha` tag, versions `0.x.0-alpha.N` (see `.changeset/pre.json`). Changesets ignores `@repo/storybook`; changelogs via `@changesets/changelog-github`.
- Branch flow: `feat/*` → `dev` (squash-merge PR) → `main` (rebase-merge PR). `baseBranch` is `main`.
- Pushing to `main` triggers `release.yml`: the Changesets action opens/updates a "version packages" PR, or publishes when one is merged. Publishes are public + scoped with `--provenance` (`NPM_CONFIG_PROVENANCE`).
- `check:attw` is a **no-op echo** — `@arethetypeswrong/cli` is incompatible with Node 24 (`DecompressionStream` bug in `@andrewbranch/untar.js`). `publint` is the real publish-validation gate.
- CI (`ci.yml`, on PR + push to `main`): install → lint → typecheck → test → build → check → storybook:build, on Node 24.16.0 / pnpm 11.7.0.

## Cross-repo local development

`@beratiyilik/ts-utils` and `@beratiyilik/browser-utils` live in a separate repo (`ts-libs`) and are consumed as pinned published alpha versions (e.g. `0.1.0-alpha.2`). The production `.npmrc` is empty; CI resolves from npm. To develop against **unpublished** ts-libs versions, point a gitignored `.npmrc.local` at a local registry (e.g. Verdaccio on `http://localhost:4873/`):

```ini
@beratiyilik:registry=http://localhost:4873/
```

then publish from `ts-libs` to that registry.
