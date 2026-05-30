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
          "Primary UI component for user interaction. Supports `primary` and `secondary` variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  parameters: {
    docs: { description: { story: "Default primary variant." } },
  },
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  parameters: {
    docs: { description: { story: "Secondary variant for less prominent actions." } },
  },
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: "Disabled state — non-interactive, reduced opacity." } },
  },
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};
