import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@beratiyilik/react-components";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Primary UI component for user interaction. Supports `primary`, `secondary`, `ghost`, `outline`, `destructive` variants and `sm`, `md`, `lg` sizes. Pass `loading` for a spinner state. Use `mode` (`normal` | `debounce` | `throttle`) with `delay` (ms) to control click behaviour. Defaults to `type="button"`; async `onClick` toggles loading automatically.',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "destructive"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    mode: {
      control: "select",
      options: ["normal", "debounce", "throttle"],
    },
    delay: {
      control: "number",
      if: { arg: "mode", neq: "normal" },
      description: "Click delay in ms. Inert when `mode` is `normal`.",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Native button type. Defaults to `button`.",
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  parameters: { docs: { description: { story: "Default primary variant." } } },
  args: { variant: "primary", children: "Primary Button" },
};

export const Secondary: Story = {
  parameters: { docs: { description: { story: "Secondary variant for less prominent actions." } } },
  args: { variant: "secondary", children: "Secondary Button" },
};

export const Ghost: Story = {
  parameters: { docs: { description: { story: "Ghost — transparent background, subtle hover." } } },
  args: { variant: "ghost", children: "Ghost Button" },
};

export const Outline: Story = {
  parameters: {
    docs: { description: { story: "Outline — transparent background with visible border." } },
  },
  args: { variant: "outline", children: "Outline Button" },
};

export const Destructive: Story = {
  parameters: {
    docs: { description: { story: "Destructive — red background for dangerous actions." } },
  },
  args: { variant: "destructive", children: "Delete" },
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Loading state — spinner overlays the label (kept in the a11y tree as `aria-busy`), interaction disabled.",
      },
    },
  },
  args: { variant: "primary", loading: true, children: "Save" },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: "Disabled state — non-interactive, reduced opacity." } },
  },
  args: { variant: "primary", disabled: true, children: "Disabled Button" },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: "All five sizes: xs, sm, md (default), lg, xl." } },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { docs: { description: { story: "All 5 variants side by side." } } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const Debounce: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Debounce mode — `onClick` fires only after the user stops clicking for `delay` ms (trailing edge). Spam the button to observe the behaviour.",
      },
    },
  },
  args: {
    variant: "primary",
    mode: "debounce",
    delay: 500,
    onClick: () => console.log("debounced click fired"),
    children: "Debounce (500ms)",
  },
};

export const Throttle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Throttle mode — `onClick` fires at most once per `delay` ms (leading edge); clicks within the window are dropped.",
      },
    },
  },
  args: {
    variant: "primary",
    mode: "throttle",
    delay: 1000,
    onClick: () => console.log("throttled click fired"),
    children: "Throttle (1000ms)",
  },
};

export const AsyncLoading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Async `onClick` — button manages its own loading state and blocks re-entry while the promise is pending. Spinner appears automatically.",
      },
    },
  },
  args: {
    variant: "primary",
    onClick: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    children: "Save (async)",
  },
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only mode — square button (`width = height`), no horizontal padding. Always provide `aria-label` for accessibility; a dev-mode warning fires if omitted.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "#71717a", width: "1.5rem" }}>{size}</span>
          {(["primary", "secondary", "ghost", "outline", "destructive"] as const).map((variant) => (
            <Button key={variant} iconOnly size={size} variant={variant} aria-label={variant}>
              ✦
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const InsideForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Buttons default to `type="button"` — clicking does not submit the surrounding form. Pass `type="submit"` to submit. Check the console.',
      },
    },
  },
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("form submitted");
      }}
      style={{ display: "flex", gap: "0.5rem" }}
    >
      <Button onClick={() => console.log("clicked, no submit")}>Does not submit</Button>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </form>
  ),
};
