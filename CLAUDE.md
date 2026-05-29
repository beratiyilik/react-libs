# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# All packages
pnpm install
pnpm build          # turbo: builds all packages in dependency order
pnpm typecheck      # turbo: tsc --noEmit all packages
pnpm test           # turbo: vitest run all packages
pnpm lint           # turbo: eslint all packages
pnpm check          # turbo: publint + attw (attw is a no-op, Node 24 bug)
pnpm format         # prettier --write
pnpm clean          # remove dist/node_modules/.turbo per package
pnpm clean:all      # clean + root node_modules + lockfile

# Single package
pnpm --filter @beratiyilik/react-components build
pnpm --filter @beratiyilik/react-table test

# Watch mode
pnpm dev            # tsc --watch all packages via turbo

# Single test file (from package directory)
cd packages/react-components && pnpm vitest run src/components/Button.test.tsx

# Release
pnpm changeset                # interactive: select packages + bump type
pnpm changeset version        # apply version bumps
pnpm release                  # build + changeset publish (CI only)
```

## Architecture

### Package graph

```
@beratiyilik/react-table
  └── @beratiyilik/react-components  (workspace:*)
        ├── @beratiyilik/ts-utils    (npm, from separate ts-libs repo)
        └── @beratiyilik/browser-utils (npm, from separate ts-libs repo)
```

`react`, `react-dom`, and `styled-components` are peer dependencies of both packages — never direct dependencies.

### Build pipeline

Each package builds with `tsc -p tsconfig.build.json` (no bundler). Output is ESM-only, 1:1 `src/*.ts(x)` → `dist/*.js`. The `dist/` dir is the published artifact (`"files": ["dist"]`). `tsconfig.json` is for editor/typecheck only; `tsconfig.build.json` sets `outDir`/`rootDir` and excludes test files.

Turbo task order: `build` depends on `^build` (upstream first), `test`/`typecheck` depend on `^build`.

### react-components structure

- `src/theme/` — `Theme` type, `defaultTheme`, and `styled.d.ts` which augments `DefaultTheme` from styled-components so theme tokens are typed in all `styled.*` templates.
- `src/components/` — `Button`, `Stack`, `ToggleSwitch`, `SearchBox`. All use `{ styled }` (named import) from `styled-components`. Transient props use the `$` prefix convention (`$variant`, `$checked`).
- `src/hooks/` — `useDebounce`, `useThrottle`, `useLocalStorage`.
- `src/notification/` — `NotificationProvider` (context + `Notifications` renderer). Wrap the app once; call `useNotification()` anywhere inside. Uses `uuid()` from `@beratiyilik/ts-utils`.
- `src/utilities/` — `ComponentRenderer`: renders `ReactNode | render-prop function | string` uniformly.
- `src/internal/` — not exported; importing from here is blocked by ESLint `no-restricted-imports`.

### react-table structure

`Table<T>` is a generic component that accepts `options: TableOptions<T>` and `data: T[]`.

**Data pipeline** (inside `TableProvider`):
```
raw data → useSearch (fuse.js fuzzy, debounced) → useFilters (per-field) → useSort → usePagination → processedData
```
Selection state (`useSelection`) operates on the original `data` array, not the processed slice.

All state lives in `TableContext`. Sub-components (`HeaderSection`, `BodySection`, `FooterSection`, `TopSection`) consume it via `useTable()`. Never pass data as props between sub-components — always go through context.

`FieldOption<T>` drives column config: `sortable`, `filterable`, `selection`, `render` (custom cell renderer). Search uses `fuse.js` with `threshold: 0.3` across all keys of the first data row.

### TypeScript config

All packages extend `tsconfig.base.json`:
- `target: ES2024`, `module: NodeNext`, `moduleResolution: NodeNext`
- `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` + `verbatimModuleSyntax`
- `esModuleInterop: false` — use named imports everywhere
- `ignoreDeprecations: "6.0"` — required for TS 6 with `esModuleInterop: false`

### Testing conventions

Tests use `@testing-library/react` + `vitest`. Each test that renders a styled-component must wrap with `ThemeProvider`:

```tsx
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
render(<Component />, { wrapper });
```

Call `cleanup()` explicitly after each test. `test-setup.ts` imports `@testing-library/jest-dom/vitest`.

### Cross-repo local development

`@beratiyilik/ts-utils` and `@beratiyilik/browser-utils` come from a separate repo (`ts-libs`). For local development against unpublished versions, run Verdaccio (`verdaccio`) and configure `.npmrc.local` (gitignored):

```
@beratiyilik:registry=http://localhost:4873/
```

Then publish from `ts-libs` to Verdaccio. The production `.npmrc` is empty — CI resolves from npm.

### Release flow

- Pre-release mode active: `alpha` tag. Versions follow `0.x.0-alpha.N`.
- Branch flow: `feat/*` → `dev` (squash merge PR) → `main` (rebase merge PR).
- Pushing to `main` triggers the release workflow: Changesets creates a "Version Packages" PR or publishes if one already exists.
- `check:attw` is a no-op echo — `@arethetypeswrong/cli` is incompatible with Node 24 (`DecompressionStream` bug in `@andrewbranch/untar.js`).
