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
          "A controlled toggle switch component. Requires `selected` and `onChange` props. Supports `xs`, `sm`, `md`, `lg`, and `xl` sizes.",
      },
    },
  },
  argTypes: {
    selected: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    shape: { control: "select", options: ["pill", "square"] },
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
    docs: { description: { story: "All five sizes side by side for comparison." } },
  },
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    const [vals, setVals] = useState(sizes.map((_, i) => i % 2 === 0));
    const toggle = (i: number) => setVals((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        {sizes.map((size, i) => (
          <ToggleSwitch key={size} selected={vals[i]!} onChange={() => toggle(i)} size={size} />
        ))}
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

export const SquareShape: Story = {
  args: {
    selected: false,
  },

  parameters: {
    docs: { description: { story: "Square shape — same sliding mechanic, squared corners." } },
  },

  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <ToggleSwitch selected={selected} onChange={() => setSelected((p) => !p)} shape="square" />
    );
  },
};

export const ShapeComparison: Story = {
  parameters: {
    docs: { description: { story: "Pill vs Square shape comparison across all sizes." } },
  },
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    const [v, setV] = useState(sizes.flatMap((_, i) => [i % 2 === 0, i % 2 !== 0]));
    const toggle = (i: number) => setV((prev) => prev.map((val, idx) => (idx === i ? !val : val)));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ width: "4rem", fontSize: "0.75rem" }}>Pill</span>
          {sizes.map((size, i) => (
            <ToggleSwitch
              key={size}
              selected={v[i]!}
              onChange={() => toggle(i)}
              size={size}
              shape="pill"
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ width: "4rem", fontSize: "0.75rem" }}>Square</span>
          {sizes.map((size, i) => (
            <ToggleSwitch
              key={size}
              selected={v[i + 5]!}
              onChange={() => toggle(i + 5)}
              size={size}
              shape="square"
            />
          ))}
        </div>
      </div>
    );
  },
};
