import { Meta, StoryObj } from "@storybook/react";
import { GreetingComponent } from "./greeting-component.component";

const meta: Meta<typeof GreetingComponent> = {
  component: GreetingComponent,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "1200px",
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

type Story = StoryObj<typeof GreetingComponent>;

export const Playground: Story = {
  args: {},
};
