import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SearchBox } from "@beratiyilik/react-components";

const meta: Meta<typeof SearchBox> = {
  title: "Components/SearchBox",
  component: SearchBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Search input with controlled and uncontrolled modes. Supports `value`/`onChange` for controlled usage, `size` (sm/md/lg), `fluid` width, `label` customization, and `passive` mode.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    fluid: { control: "boolean" },
    passive: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
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
  parameters: { docs: { description: { story: "All three sizes: sm, md (default), lg." } } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <SearchBox size="sm" label="Small" />
      <SearchBox size="md" label="Medium" />
      <SearchBox size="lg" label="Large" />
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

export const Passive: Story = {
  parameters: { docs: { description: { story: "Passive mode — component returns null." } } },
  args: { passive: true, label: "Search" },
};
