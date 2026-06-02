import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "@beratiyilik/react-components";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible checkbox with checked, unchecked, and indeterminate states. Supports `xs`, `sm`, `md`, `lg`, `xl` sizes and optional `label`.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    label: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  parameters: { docs: { description: { story: "Default unchecked state." } } },
  args: { checked: false, onChange: () => {} },
};

export const Checked: Story = {
  parameters: { docs: { description: { story: "Checked state." } } },
  args: { checked: true, onChange: () => {} },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: { story: "Indeterminate — some items selected (used in select-all headers)." },
    },
  },
  args: { checked: false, indeterminate: true, onChange: () => {} },
};

export const Disabled: Story = {
  parameters: { docs: { description: { story: "Disabled — non-interactive, reduced opacity." } } },
  args: { checked: false, disabled: true, onChange: () => {} },
};

export const WithLabel: Story = {
  parameters: {
    docs: { description: { story: "With label — renders inside a clickable label element." } },
  },
  args: { checked: false, label: "Accept terms and conditions", onChange: () => {} },
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: "All five sizes: xs, sm, md (default), lg, xl." } },
  },
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    const labels: Record<(typeof sizes)[number], string> = {
      xs: "XSmall",
      sm: "Small",
      md: "Medium",
      lg: "Large",
      xl: "XLarge",
    };
    const [vals, setVals] = useState(sizes.map((_, i) => i === 2));
    const toggle = (i: number) => setVals((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        {sizes.map((size, i) => (
          <Checkbox
            key={size}
            size={size}
            checked={vals[i] ?? false}
            onChange={() => toggle(i)}
            label={labels[size]}
          />
        ))}
      </div>
    );
  },
};

export const Controlled: Story = {
  parameters: { docs: { description: { story: "Fully controlled via useState." } } },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onChange={setChecked} label={checked ? "Checked" : "Unchecked"} />
    );
  },
};

export const SelectAllPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Select-all pattern with indeterminate state — mimics table header checkbox behavior.",
      },
    },
  },
  render: () => {
    const [items, setItems] = useState([false, true, false, false]);
    const allSelected = items.every(Boolean);
    const someSelected = items.some(Boolean) && !allSelected;
    const toggleAll = () => setItems((prev) => prev.map(() => !allSelected));
    const toggleItem = (i: number) =>
      setItems((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={toggleAll}
          label="Select all"
        />
        <div
          style={{
            paddingLeft: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {items.map((checked, i) => (
            <Checkbox
              key={i}
              checked={checked}
              onChange={() => toggleItem(i)}
              label={`Item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  },
};
