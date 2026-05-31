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
          "Primary UI component for user interaction. Supports `primary`, `secondary`, `ghost`, `outline`, `destructive` variants and `sm`, `md`, `lg` sizes. Pass `loading` for a spinner state.",
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
      options: ["sm", "md", "lg"],
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
      description: { story: "Loading state — spinner replaces children, interaction disabled." },
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
  parameters: { docs: { description: { story: "All three sizes: sm, md (default), lg." } } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
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
