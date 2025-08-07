import { Meta, StoryObj } from "@storybook/react";
import { CardNotFoundData } from "./cardNotFoundData.component";

const meta: Meta<typeof CardNotFoundData> = {
  component: CardNotFoundData,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          height: "400px",
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

type Story = StoryObj<typeof CardNotFoundData>;

export const Playground: Story = {
  args: {
    text: "Não existem dados.",
  },
};
