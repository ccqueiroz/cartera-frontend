import { useCallback, useMemo, useState } from "react";
import { Month, MonthCalendarProps } from "../monthDatePicker.component";

export const useMonthCalendar = ({
  selectedMonth,
  onMonthSelect,
  minDate,
  maxDate,
  disabledDates,
}: MonthCalendarProps) => {
  const initialYear = selectedMonth?.getFullYear() || new Date().getFullYear();
  const selectedMonthNumber = selectedMonth?.getMonth();

  const [menuYear, setMenuYear] = useState<number>(initialYear);

  const disabledDatesMapped = useMemo(
    () =>
      disabledDates?.map((d) => ({
        year: d.getFullYear(),
        month: d.getMonth(),
      })) ?? [],
    [disabledDates]
  );

  const isDisabled = useCallback(
    (month: Month): boolean => {
      if (
        maxDate &&
        (menuYear > maxDate.getFullYear() ||
          (menuYear === maxDate.getFullYear() &&
            month.number > maxDate.getMonth()))
      )
        return true;
      if (
        minDate &&
        (menuYear < minDate.getFullYear() ||
          (menuYear === minDate.getFullYear() &&
            month.number < minDate.getMonth()))
      )
        return true;
      return disabledDatesMapped.some(
        (d) => d.year === menuYear && d.month === month.number
      );
    },
    [menuYear, maxDate, minDate, disabledDatesMapped]
  );

  const handleMonthSelect = useCallback(
    (month: Month) => {
      onMonthSelect?.(new Date(menuYear, month.number));
    },
    [menuYear, onMonthSelect]
  );

  return {
    selectedMonthNumber,
    setMenuYear,
    handleMonthSelect,
    isDisabled,
    menuYear,
  };
};
