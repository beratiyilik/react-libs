# react-libs Architecture & Conventions

## Overview

`@scope/<pkg>` — a React 19+, styled-components v6, ESM-only component library; browser-only. Typed UI primitives, hooks, and a data table built on a shared theme layer with zero runtime dependencies beyond React and styled-components.

## Goals

- typed, tree-shakeable React components with a shared theme contract
- independent and fully controlled — no reliance on broad third-party UI frameworks
- reusable foundational layer across React projects consuming `ts-libs` utilities

## Non-Goals

- CommonJS output
- polyfills
- SSR / server-component rendering (no server-side style injection)
- framework-specific wrappers beyond React
- CLI tooling
- plugin system

## Project Structure

- repo: `react-libs` — monorepo, `packages/*` convention
- repo boundary: `ts-libs` and `react-libs` are separate git repositories; `ts-libs` packages are external consumers resolved via npm
- package naming: `@scope/<pkg-name>` — no prefix redundancy (e.g. no `@scope/react-libs-<pkg-name>`)
- monorepo tooling: pnpm workspaces + turborepo

### Packages

| package            | depends on                    |
| ------------------ | ----------------------------- |
| `react-components` | `browser-utils`, `ts-utils`   |
| `react-table`      | `react-components`, `fuse.js` |

`react-components` and `react-table` consume `ts-libs` packages via npm (published versions). `react-table` receives `ts-utils` and `browser-utils` transitively through `react-components`.

### Intra-repo dependency graph

```
ts-utils (ts-libs repo)
├── node-utils (ts-libs repo)
└── browser-utils (ts-libs repo)
    └── react-components
        └── react-table
```

## Runtime & Compatibility

- runtime support: browser-only
- runtime compatibility: browsers per baseline below; bundlers with `exports` field support (webpack 5, Vite, Rollup) for downstream consumers
- browser baseline: ES2024-capable engines (Chrome 119+, Firefox 121+, Safari 17.4+)
- framework: React 19+
- peer dependencies: `react >=19.0.0`, `react-dom >=19.0.0`, `styled-components >=6.0.0`

## Module System & Exports

- module strategy: ESM-only
- exports strategy: `exports` field only — no `module` field, bundler resolution via conditional exports
- export scope: root only (`@username/<pkg>`); subpaths only if bundler-less runtime support is required
- exports: named exports only; no default export

## API Design

- public API: strict encapsulation enforced via `exports` field + `package.json` `"files"` allowlist + ESLint `no-restricted-imports` rule against `src/internal/*`
- component design: styled-components v6 with `DefaultTheme` augmentation — all theme tokens typed via `src/theme/styled.d.ts`; transient props use `$` prefix convention
- types: clean and ergonomic; no overly complex generics
- error handling: fail-fast, transparent errors; no suppression; no over-engineering

## Dependencies

- dependencies: zero or strictly minimal, well-maintained, single-purpose — no bloated or multi-purpose packages
- side effects: `"sideEffects": false` on all packages; no global mutations, no polyfills

## Build

- build: TypeScript-first — target ES2024
- build pipeline: `tsc -p tsconfig.build.json` — single step emitting both `.js` and `.d.ts` with preserved module graph
- type check: `tsc -p tsconfig.json --noEmit` — separate step
- optimization: maximally tree-shake-friendly output — preserved 1:1 source-to-output module graph, `sideEffects: false`, named exports, no top-level side effects

## Tooling

- lint/format: ESLint + Prettier
- test: Vitest + `@testing-library/react` + `@testing-library/jest-dom`
- styling: styled-components v6 (`{ styled }` named import)
- fuzzy search: fuse.js (react-table)
- publish validation: `publint` + `@arethetypeswrong/cli` in CI (attw currently no-op on Node 24 — DecompressionStream bug)

## CI

- pipeline (per PR): install (pnpm) → lint (ESLint) → format check (Prettier) → type check (`tsc --noEmit`) → test (Vitest) → build (`tsc` build)
- publish validation gate: `publint` + `@arethetypeswrong/cli`
- release/publish job: Changesets version-PR merge triggers `npm publish` with `--provenance`

## Release

- distribution: npm publish, public, scoped, with `--provenance` enabled in CI
- versioning: strict SemVer (MAJOR.MINOR.PATCH); pre-release path: `alpha → beta → rc → stable`
- current status: pre-release mode active (`alpha` tag — `0.x.0-alpha.N`)
- release automation: Changesets — per-package independent versioning, automated SemVer bumps via PR-based workflow, changelog generation, npm publish triggered on version PR merge
