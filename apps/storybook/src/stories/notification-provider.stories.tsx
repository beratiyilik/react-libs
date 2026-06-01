import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationProvider, useNotification, NotifyTypes } from "@beratiyilik/react-components";
import { Button, Stack } from "@beratiyilik/react-components";

const meta: Meta<typeof NotificationProvider> = {
  title: "Components/NotificationProvider",
  component: NotificationProvider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Context provider for toast notifications. Wrap your app with `NotificationProvider` and consume via `useNotification` hook. Supports `success`, `error`, `info`, `warning` types with configurable duration.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationProvider>;

const NotificationDemo = () => {
  const { success, error, info, warning } = useNotification();
  return (
    <Stack direction="row" gap="sm">
      <Button variant="primary" onClick={() => success("Operation successful")}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => error("Something went wrong")}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => info("Here is some info")}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => warning("Proceed with caution")}>
        Warning
      </Button>
    </Stack>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "All four notification types — success, error, info, warning." },
    },
  },
  render: () => (
    <NotificationProvider>
      <NotificationDemo />
    </NotificationProvider>
  ),
};

export const CustomDuration: Story = {
  parameters: {
    docs: {
      description: {
        story: "Custom duration per notification. Pass `0` for persistent (no auto-dismiss).",
      },
    },
  },
  render: () => {
    const Demo = () => {
      const { show } = useNotification();
      return (
        <Stack direction="row" gap="sm">
          <Button onClick={() => show("Stays for 1 second", NotifyTypes.INFO, 1000)}>1s</Button>
          <Button onClick={() => show("Stays for 5 seconds", NotifyTypes.SUCCESS, 5000)}>5s</Button>
          <Button onClick={() => show("Stays until dismissed", NotifyTypes.WARNING, 0)}>
            Persistent
          </Button>
        </Stack>
      );
    };
    return (
      <NotificationProvider>
        <Demo />
      </NotificationProvider>
    );
  },
};
