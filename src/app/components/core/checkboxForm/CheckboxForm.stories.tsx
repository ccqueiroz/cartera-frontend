import { Meta, StoryObj } from "@storybook/react";
import { CheckboxForm } from "./checkboxForm.component";

const meta: Meta<typeof CheckboxForm> = {
  component: CheckboxForm,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
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

type Story = StoryObj<typeof CheckboxForm>;

export const Playground: Story = {
  args: {
    label: "Aceita os termos",
    id: "aceita_os_termos",
    error: "Campo Obrigatório",
    positionLabel: 'right'
  },
};
