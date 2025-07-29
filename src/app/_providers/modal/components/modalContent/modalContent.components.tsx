import { memo } from "react";

type ModalContentProps = {
  children?: React.ReactNode;
};

const ModalContent = memo(({ children }: ModalContentProps) => {
  return <div className="w-full h-full pt-1">{children}</div>;
});

ModalContent.displayName = "ModalContent";

export { ModalContent };
