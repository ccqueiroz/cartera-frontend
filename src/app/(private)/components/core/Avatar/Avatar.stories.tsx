import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar.component";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
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

type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/61844259?s=96&v=4",
  },
};

export const PlaygroundAvatarWithoutImage: Story = {
  args: {
    src: "",
  },
};
