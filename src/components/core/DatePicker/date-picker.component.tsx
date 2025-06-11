"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover/popover";
import { ButtonUi } from "@/components/ui/Button/button.ui";
import { cn } from "@/lib/cn.utils";
import { Calendar, CalendarProps } from "@/components/ui/Calendar/calendar";
import { DateRange } from "react-day-picker";
import { useDatePicker } from "./useDatePicker";

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

export const DatePicker = ({
  classNameButton,
  classNamePopover,
  mode = "single",
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Informe um período",
  disabled = false,
  ...props
}: DatePickerProps) => {
  const {
    selected,
    handleSelect,
    setMinimumAndMaximumDate,
    formatLabel,
    open,
    setOpen,
  } = useDatePicker({
    value,
    onChange,
    minDate,
    maxDate,
    mode,
    placeholder,
  });

  const isRange = mode === "range";
  const selectedDate = !isRange ? (selected as Date) : undefined;
  const selectedRange = isRange ? (selected as DateRange) : undefined;

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonUi
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "w-[246px] justify-start text-left font-normal border",
            !selected && "text-muted-foreground",
            classNameButton
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatLabel}
        </ButtonUi>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", classNamePopover)}>
        {mode === "single" ? (
          <Calendar
            {...(props as CalendarProps)}
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect as (date: Date | undefined) => void}
            disabled={setMinimumAndMaximumDate}
            initialFocus
          />
        ) : (
          <Calendar
            {...(props as CalendarProps)}
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect as (range: DateRange | undefined) => void}
            disabled={setMinimumAndMaximumDate}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
