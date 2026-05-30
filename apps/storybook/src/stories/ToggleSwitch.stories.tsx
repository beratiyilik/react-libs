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
          "A controlled toggle switch component. Requires `selected` and `onChange` props.",
      },
    },
  },
  argTypes: {
    selected: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Off: Story = {
  parameters: {
    docs: { description: { story: "Toggle in off state." } },
  },
  args: {
    selected: false,
    onChange: () => {},
  },
};

export const On: Story = {
  parameters: {
    docs: { description: { story: "Toggle in on state." } },
  },
  args: {
    selected: true,
    onChange: () => {},
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
