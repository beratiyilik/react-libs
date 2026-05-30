import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ToggleSwitch } from "@beratiyilik/react-components";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A controlled toggle switch component. Requires `selected` and `onChange` props. Supports `sm`, `md`, and `lg` sizes.",
      },
    },
  },
  argTypes: {
    selected: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Small: Story = {
  parameters: {
    docs: { description: { story: "Small size — for use inside dense UI like tables." } },
  },
  args: {
    selected: false,
    onChange: () => {},
    size: "sm",
  },
};

export const Medium: Story = {
  parameters: {
    docs: { description: { story: "Medium size — default." } },
  },
  args: {
    selected: false,
    onChange: () => {},
    size: "md",
  },
};

export const Large: Story = {
  parameters: {
    docs: { description: { story: "Large size." } },
  },
  args: {
    selected: false,
    onChange: () => {},
    size: "lg",
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: { description: { story: "All three sizes side by side for comparison." } },
  },
  render: () => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(true);
    const [lg, setLg] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ToggleSwitch selected={sm} onChange={() => setSm((p) => !p)} size="sm" />
        <ToggleSwitch selected={md} onChange={() => setMd((p) => !p)} size="md" />
        <ToggleSwitch selected={lg} onChange={() => setLg((p) => !p)} size="lg" />
      </div>
    );
  },
};

export const Controlled: Story = {
  parameters: {
    docs: { description: { story: "Fully controlled — state managed externally via useState." } },
  },
  render: () => {
    const [selected, setSelected] = useState(false);
    return <ToggleSwitch selected={selected} onChange={() => setSelected((prev) => !prev)} />;
  },
};
