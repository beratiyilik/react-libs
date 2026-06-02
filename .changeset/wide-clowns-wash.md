---
"@beratiyilik/react-components": minor
"@beratiyilik/react-table": minor
---

### Button: debounce, throttle, async loading, and type safety

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
