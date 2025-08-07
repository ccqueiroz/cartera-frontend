import {
  DialogTitle,
  DialogDescription,
  DialogHeader as DialogHeaderShadcn,
} from "@/app/components/ui/dialog";

import { cn } from "@/app/utils/cn.utils";
import { createElement, memo } from "react";
import { ModalHeaderProps } from "../../modal.types";

const ModalHeader = memo(
  ({ description, className, title }: ModalHeaderProps) => {
    return (
      <DialogHeaderShadcn>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && (
          <DialogDescription
            className={cn(
              "flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-start",
              className
            )}
          >
            {createElement(description)}
          </DialogDescription>
        )}
      </DialogHeaderShadcn>
    );
  }
);

ModalHeader.displayName = "ModalHeader";

export { ModalHeader };
