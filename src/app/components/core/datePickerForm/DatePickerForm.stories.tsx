import { Meta, StoryObj } from "@storybook/react";
import { DatePickerForm } from "./datePickerForm.component";

const meta: Meta<typeof DatePickerForm> = {
  component: DatePickerForm,
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

type Story = StoryObj<typeof DatePickerForm>;

export const Playground: Story = {
  args: {
    label: "Insira a data",
    id: "insira_a_data",
    error: "Campo Obrigatório",
  },
};
