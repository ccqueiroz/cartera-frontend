import { Meta, StoryObj } from "@storybook/react";
import { InputForm } from "./inputForm.component";

const meta: Meta<typeof InputForm> = {
  component: InputForm,
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

type Story = StoryObj<typeof InputForm>;

export const Playground: Story = {
  args: {
    label: "E-mail",
    placeholder: "Digite o seu e-mail",
    id: "mail",
    error: "Campo Obrigatório",
  },
};
