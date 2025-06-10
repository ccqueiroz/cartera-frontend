import {
  DialogTitle,
  DialogDescription,
  DialogHeader as DialogHeaderShadcn,
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn.utils";

interface DialogHeaderProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

export const DialogHeader = ({
  children,
  title,
  className,
}: DialogHeaderProps) => {
  return (
    <DialogHeaderShadcn>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogDescription
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-start",
          className
        )}
      >
        {children}
      </DialogDescription>
    </DialogHeaderShadcn>
  );
};
