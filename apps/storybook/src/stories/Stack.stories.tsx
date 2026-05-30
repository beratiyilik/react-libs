import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, Button } from "@beratiyilik/react-components";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Flex layout primitive. Controls direction and gap between children using theme spacing tokens.",
      },
    },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
    },
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Column: Story = {
  parameters: {
    docs: { description: { story: "Vertical stack — default direction." } },
  },
  args: {
    direction: "column",
    gap: "md",
  },
  render: (args) => (
    <Stack {...args}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Stack>
  ),
};

export const Row: Story = {
  parameters: {
    docs: { description: { story: "Horizontal stack." } },
  },
  args: {
    direction: "row",
    gap: "md",
  },
  render: (args) => (
    <Stack {...args}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Stack>
  ),
};
