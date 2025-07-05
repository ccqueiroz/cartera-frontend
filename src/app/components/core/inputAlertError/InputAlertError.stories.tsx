import { Meta, StoryObj } from "@storybook/react";
import { InputAlertError } from "./inputAlertError.component";

const meta: Meta<typeof InputAlertError> = {
  component: InputAlertError,
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

type Story = StoryObj<typeof InputAlertError>;

export const Playground: Story = {
  args: {
    error: "Campo Obrigatório",
  },
};
