import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SearchBox, Button } from "@beratiyilik/react-components";

const meta: Meta<typeof SearchBox> = {
  title: "Components/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Search input with controlled and uncontrolled modes. Supports `value`/`onChange` for controlled usage, `size` (sm/md/lg), `fluid` width, `label`, and `passive` mode. Heights match `Button` at the same size. Renders a native `type="search"` input; without a `label`, `aria-label` (falling back to `placeholder`) supplies the accessible name.',
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    fluid: { control: "boolean" },
    passive: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    "aria-label": {
      control: "text",
      description: "Accessible name when no visible `label` is set. Defaults to `placeholder`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Uncontrolled: Story = {
  parameters: { docs: { description: { story: "Uncontrolled — internal state, no value prop." } } },
  args: { label: "Search", placeholder: "Search…" },
};

export const Controlled: Story = {
  parameters: {
    docs: { description: { story: "Controlled — value managed externally via useState." } },
  },
  render: () => {
    const [value, setValue] = useState("");
    return <SearchBox value={value} onChange={setValue} label="Search" />;
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: "All five sizes: xs, sm, md (default), lg, xl." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <SearchBox size="xs" label="XSmall" />
      <SearchBox size="sm" label="Small" />
      <SearchBox size="md" label="Medium" />
      <SearchBox size="lg" label="Large" />
      <SearchBox size="xl" label="XLarge" />
    </div>
  ),
};

export const Fluid: Story = {
  parameters: { docs: { description: { story: "Fluid — stretches to full container width." } } },
  render: () => (
    <div style={{ width: "400px" }}>
      <SearchBox fluid label="Search" placeholder="Full width search…" />
    </div>
  ),
};

export const CustomLabel: Story = {
  parameters: { docs: { description: { story: "Custom label text." } } },
  args: { label: "Filter results", placeholder: "Type to filter…" },
};

export const NoLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "No visible label — accessible name comes from `aria-label`, or `placeholder` if unset.",
      },
    },
  },
  args: { placeholder: "Search users", "aria-label": "Search users" },
};

export const WithButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Height alignment with `Button` at matching sizes. The input and the button should share the same height per row.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SearchBox size={size} label={size} placeholder="Search…" />
          <Button size={size}>Go</Button>
        </div>
      ))}
    </div>
  ),
};

export const Passive: Story = {
  parameters: {
    docs: {
      description: {
        story: "Passive mode — component returns `null`. The empty render below is expected.",
      },
    },
  },
  args: { passive: true, label: "Search" },
};
