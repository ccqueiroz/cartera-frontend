import { Meta, StoryObj } from "@storybook/react";
import { NotificationsButtons } from "./notificationsButton.component";

const meta: Meta<typeof NotificationsButtons> = {
  component: NotificationsButtons,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotificationsButtons>;

export const Playground: Story = {
  args: {},
};
