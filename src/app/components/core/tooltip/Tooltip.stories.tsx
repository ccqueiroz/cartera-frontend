import { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip.component";

const meta: Meta<typeof TooltipContent> = {
  component: TooltipContent,
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
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-default">
              <p className="font-medium text-white">Algum Texto</p>
            </TooltipTrigger>
            <Story />
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TooltipContent>;

export const Playground: Story = {
  args: {
    variant: "solid",
    children: <p>Algum Texto para aparecer no Tooktip</p>,
  },
};
