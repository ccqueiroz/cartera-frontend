import { Meta, StoryObj } from "@storybook/react";
import { DialogHeader } from "./dialog-header.component";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const meta: Meta<typeof DialogHeader> = {
  component: DialogHeader,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <p>Clique Aqui!</p>
          </DialogTrigger>
          <DialogContent>
            <Story />
          </DialogContent>
        </Dialog>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DialogHeader>;

export const Playground: Story = {
  args: {
    title: "Título do Header",
    children: "Filho do Header",
  },
};
