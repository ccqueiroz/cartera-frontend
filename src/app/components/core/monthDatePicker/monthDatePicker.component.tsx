"use client";

import React from "react";
import { cn } from "@/app/utils/cn.utils";
import { format } from "date-fns/format";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonUi, buttonVariants } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ptBR } from "date-fns/locale";
import { useMonthCalendar } from "./hook/useMonthCalendar.hook";

export type Month = {
  number: number;
  name: string;
};

const MONTHS: Month[][] = [
  [
    { number: 0, name: "Jan" },
    { number: 1, name: "Fev" },
    { number: 2, name: "Mar" },
    { number: 3, name: "Abr" },
  ],
  [
    { number: 4, name: "Mai" },
    { number: 5, name: "Jun" },
    { number: 6, name: "Jul" },
    { number: 7, name: "Ago" },
  ],
  [
    { number: 8, name: "Set" },
    { number: 9, name: "Out" },
    { number: 10, name: "Nov" },
    { number: 11, name: "Dez" },
  ],
];

export type MonthCalendarProps = {
  selectedMonth?: Date;
  onMonthSelect?: (date: Date) => void;
  onYearForward?: () => void;
  onYearBackward?: () => void;
  callbacks?: {
    yearLabel?: (year: number) => string;
    monthLabel?: (month: Month) => string;
  };
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
};

const styleSelectedMonth = `bg-neon-blue/20 text-primary-foreground hover:bg-neon-blue/30 rounded-full`;
const styleDeselectedMonth = `hover:bg-accent hover:text-accent-foreground rounded-md`;

const MonthCalendar = React.memo(
  ({
    selectedMonth,
    onMonthSelect,
    onYearForward,
    onYearBackward,
    callbacks,
    minDate,
    maxDate,
    disabledDates,
  }: MonthCalendarProps) => {
    const {
      selectedMonthNumber,
      setMenuYear,
      handleMonthSelect,
      isDisabled,
      menuYear,
    } = useMonthCalendar({
      selectedMonth,
      onMonthSelect,
      callbacks,
      minDate,
      maxDate,
      disabledDates,
    });
    return (
      <div>
        <div className="flex justify-center pt-1 relative items-center">
          <div className="text-sm font-medium">
            {callbacks?.yearLabel ? callbacks.yearLabel(menuYear) : menuYear}
          </div>
          <div className="space-x-1 flex items-center">
            <button
              onClick={() => {
                setMenuYear((y) => y - 1);
                onYearBackward?.();
              }}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute left-1 h-7 w-7 p-0"
              )}
            >
              <ChevronLeft className="h-4 w-4 opacity-50" />
            </button>
            <button
              onClick={() => {
                setMenuYear((y) => y + 1);
                onYearForward?.();
              }}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute right-1 h-7 w-7 p-0"
              )}
            >
              <ChevronRight className="h-4 w-4 opacity-50" />
            </button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            {MONTHS.map((row, i) => (
              <tr key={i} className="flex mt-2 w-full">
                {row.map((m) => (
                  <td
                    key={m.number}
                    className="w-1/4 h-10 text-center text-sm p-0"
                  >
                    <button
                      onClick={() => handleMonthSelect(m)}
                      disabled={isDisabled(m)}
                      className={cn(
                        selectedMonthNumber === m.number &&
                          selectedMonth?.getFullYear() === menuYear
                          ? styleSelectedMonth
                          : styleDeselectedMonth,
                        "w-full h-full p-0 font-normal transition-all duration-200 disabled:cursor-not-allowed disabled:text-foreground/20 disabled:hover:bg-transparent"
                      )}
                    >
                      {callbacks?.monthLabel ? callbacks.monthLabel(m) : m.name}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

MonthCalendar.displayName = "MonthCalendar";

const MonthDatePick = ({
  onMonthSelect,
  minDate,
  maxDate,
  disabledDates,
  callbacks,
  onYearBackward,
  onYearForward,
  className,
  date,
  placeholder = "Selecione um período",
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  MonthCalendarProps & {
    date?: Date;
    placeholder?: string;
  }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-10 bg-gradient-neon p-[2px] rounded-md flex justify-center items-center">
          <ButtonUi
            variant="outline"
            className={cn(
              "w-[246px] h-9 justify-start text-left font-normal hover:bg-background",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "MMMM yyyy", {
                locale: ptBR,
              })
            ) : (
              <span>{placeholder}</span>
            )}
          </ButtonUi>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-gradient-dark" {...props}>
        <div className={cn("min-w-[200px] w-[246px] p-3", className)}>
          <div className="space-y-4">
            <MonthCalendar
              onMonthSelect={onMonthSelect}
              selectedMonth={date}
              callbacks={callbacks}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              onYearBackward={onYearBackward}
              onYearForward={onYearForward}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { MonthDatePick };
