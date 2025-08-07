import { cn } from "@/app/utils/cn.utils";
import { DatePicker } from "../datePicker/datePicker.component";
import { Label } from "../../ui/label";
import { InputAlertError } from "../inputAlertError/inputAlertError.component";

interface DatePickerFormProps extends React.ComponentProps<typeof DatePicker> {
  id: string;
  error?: string;
  label?: React.ReactNode;
  classNameWrapper?: string;
  classNameLabel?: string;
}

export const DatePickerForm = ({
  id,
  label,
  error,
  classNameWrapper,
  classNameLabel,
  ...props
}: DatePickerFormProps) => {
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
      <DatePicker id={id} {...props} />
      {error && <InputAlertError error={error} />}
    </div>
  );
};
