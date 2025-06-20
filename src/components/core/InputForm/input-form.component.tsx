import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { InputAlertError } from "../InputAlertError/input-alert-error.component";
import { cn } from "@/lib/cn.utils";

interface InputFormProps extends React.ComponentProps<"input"> {
  id: string;
  error?: string;
  label?: React.ReactNode;
  classNameWrapper?: string;
  classNameInput?: string;
  classNameLabel?: string;
}

export const InputForm = ({
  id,
  error,
  label,
  classNameWrapper,
  classNameInput,
  classNameLabel,
  ...props
}: InputFormProps) => {
  return (
    <div
      className={cn("w-full flex flex-col items-start gap-1", classNameWrapper)}
    >
      {label && (
        <Label
          htmlFor={id}
          className={cn("text-sm brightness-75 ml-1", classNameLabel)}
        >
          {label}
        </Label>
      )}
      <Input id={id} {...props} className={cn(classNameInput)} />
      {error && <InputAlertError error={error} />}
    </div>
  );
};
