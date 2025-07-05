import { Meta, StoryObj } from "@storybook/react";
import { NeonSpinner } from "./neonSpinner.component";

const meta: Meta<typeof NeonSpinner> = {
  component: NeonSpinner,
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

type Story = StoryObj<typeof NeonSpinner>;

export const Playground: Story = {
  args: {},
};
