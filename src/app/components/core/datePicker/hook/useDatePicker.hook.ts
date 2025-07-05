import * as React from "react";
import type { DateRange } from "react-day-picker";
import { SingleOrRange, UseDatePickerProps } from "../datePicker.types";

function isDateRange(value: SingleOrRange): value is DateRange {
  return value !== undefined && typeof value === "object" && "from" in value;
}

export const useDatePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  mode,
  placeholder,
}: UseDatePickerProps) => {
  const [internalValue, setInternalValue] = React.useState<SingleOrRange>();

  const selected = React.useMemo(
    () => value ?? internalValue,
    [value, internalValue]
  );

  const [open, setOpen] = React.useState(false);

  const handleSelect = React.useCallback(
    (next: SingleOrRange) => {
      if (mode === "range") {
        if (!isDateRange(next)) return;

        const current = selected as DateRange | undefined;

        const isNewRangeClick = current?.from && current?.to && next?.from;

        if (isNewRangeClick) {
          const newRange = { from: undefined, to: undefined };
          onChange?.(newRange);
          if (!value) setInternalValue(newRange);
          return;
        }

        onChange?.(next);
        if (!value) setInternalValue(next);

        if (next?.from && next?.to) {
          setOpen(false);
        }
        return;
      }

      if (mode === "single") {
        onChange?.(next);
        if (!value) setInternalValue(next);
        setOpen(false);
      }
    },
    [mode, selected, onChange, setOpen, value]
  );

  const formatLabel = React.useMemo(() => {
    if (mode === "single") {
      const date = selected as Date | undefined;
      return date ? date.toLocaleDateString("pt-BR") : placeholder;
    }

    const range = selected as DateRange | undefined;
    if (!range?.from) return placeholder;
    if (!range.to) return `Início: ${range.from.toLocaleDateString("pt-BR")}`;
    return `${range.from.toLocaleDateString(
      "pt-BR"
    )} → ${range.to.toLocaleDateString("pt-BR")}`;
  }, [mode, selected, placeholder]);

  const setMinimumAndMaximumDate = React.useCallback(
    (date: Date) => {
      if (minDate && maxDate) {
        return date > maxDate || date < minDate;
      }

      return false;
    },
    [minDate, maxDate]
  );

  return {
    selected,
    handleSelect,
    setMinimumAndMaximumDate,
    formatLabel,
    open,
    setOpen,
  };
};
