import { DateRange } from "react-day-picker";
import { CalendarProps } from "../../ui/calendar";

export type SingleOrRange = Date | DateRange | undefined;

export type DatePickerProps = {
  classNamePopover?: string;
  classNameButton?: string;
  value?: Date;
  onChange?: (value: SingleOrRange) => void;
  mode: "single" | "range";
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
} & Omit<CalendarProps, "mode" | "selected" | "onSelect">;

export type UseDatePickerProps = Pick<
  DatePickerProps,
  "value" | "minDate" | "maxDate" | "onChange" | "mode" | "placeholder"
>;
