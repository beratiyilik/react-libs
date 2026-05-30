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
          "A controlled search input. Accepts `searchTerm` and `setSearchTerm` props. Renders nothing when `passive` is true.",
      },
    },
  },
  argTypes: {
    passive: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "Default state with empty search term." } },
  },
  args: {
    searchTerm: "",
    setSearchTerm: () => {},
  },
};

export const WithValue: Story = {
  parameters: {
    docs: { description: { story: "Pre-filled search term." } },
  },
  args: {
    searchTerm: "react",
    setSearchTerm: () => {},
  },
};

export const Passive: Story = {
  parameters: {
    docs: {
      description: { story: "Passive mode — renders nothing. Used to hide search externally." },
    },
  },
  args: {
    searchTerm: "",
    setSearchTerm: () => {},
    passive: true,
  },
};

export const Controlled: Story = {
  parameters: {
    docs: { description: { story: "Fully controlled — state managed externally via useState." } },
  },
  render: () => {
    const [searchTerm, setSearchTerm] = useState("");
    return <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  },
};
