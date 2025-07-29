import { Meta, StoryObj } from "@storybook/react";
import { globalModalStore } from "@/app/store/globalModal/globalModal.store";
import { useEffect } from "react";
import { ModalView } from "./modal.view";

const meta: Meta<typeof ModalView> = {
  component: ModalView,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
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

type Story = StoryObj<typeof meta>;

const handleCancelAction = () => {
  console.log("handleCancelAction");
};

const ContentComponent = () => {
  return <p>Aqui está o Conteúdo do Modal</p>;
};

const Modal = () => {
  useEffect(() => {
    globalModalStore.openModal({
      actions: {
        handleCancelAction,
        handleSuccessAction: () => {
          console.log("handleSuccessAction");
        },
      },
      states: {
        handleCloseModal: handleCancelAction,
      },
      header: {
        title: "Modal Global",
        description: () => <p>Este é um exemplo de modal global do Cartera</p>,
      },
      content: () => <ContentComponent />,
      footer: {
        btnCancelAction: "Cancelar",
        btnConfirmAction: {
          children: "Salvar",
          form: { type: "button", idForm: undefined },
        },
      },
    });
  }, []);

  return <ModalView />;
};

export const Default: Story = {
  render: () => <Modal />,
};
