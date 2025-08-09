import { Meta, StoryObj } from "@storybook/react";
import { SelectForm } from "./selectForm.component";

const meta: Meta<typeof SelectForm> = {
  component: SelectForm,
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

type Story = StoryObj<typeof SelectForm>;

export const Playground: Story = {
  args: {
    label: "Meses",
    placeholder: "Selecione um item",
    id: "month",
    error: "Campo Obrigatório",
    items: [
      { value: "JAN", label: "Janeiro" },
      { value: "FEV", label: "Fevereiro" },
      { value: "MAR", label: "Março" },
      { value: "ABR", label: "Abril" },
      { value: "MAI", label: "Maio" },
      { value: "JUN", label: "Junho" },
      { value: "JUL", label: "Julho" },
      { value: "AGO", label: "Agosto" },
      { value: "SET", label: "Setembro" },
      { value: "OUT", label: "Outubro" },
      { value: "NOV", label: "Novembro" },
      { value: "DEZ", label: "Dezembro" },
    ],
  },
};
