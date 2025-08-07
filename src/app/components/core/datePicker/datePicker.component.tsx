"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ButtonUi } from "../../ui/button";
import { DateRange } from "react-day-picker";
import { Calendar, CalendarProps } from "../../ui/calendar";
import { cn } from "@/app/utils/cn.utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { useDatePicker } from "./hook/useDatePicker.hook";
import { DatePickerProps } from "./datePicker.types";
import { memo } from "react";

const DatePicker = memo(
  ({
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
          <div className="h-10 gradient-border-input p-[2px] rounded-md flex justify-center items-center">
            <ButtonUi
              disabled={disabled}
              variant={"outline"}
              className={cn(
                "w-[246px] h-9 justify-start text-left font-normal hover:bg-background",
                !selected && "text-muted-foreground",
                classNameButton
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatLabel}
            </ButtonUi>
          </div>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", classNamePopover)}>
          {mode === "single" ? (
            <Calendar
              {...(props as CalendarProps)}
              className={cn(props.className, "rounded-md")}
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect as (date: Date | undefined) => void}
              disabled={setMinimumAndMaximumDate}
            />
          ) : (
            <Calendar
              {...(props as CalendarProps)}
              className={cn(props.className, "rounded-md")}
              mode="range"
              selected={selectedRange}
              onSelect={handleSelect as (range: DateRange | undefined) => void}
              disabled={setMinimumAndMaximumDate}
            />
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
