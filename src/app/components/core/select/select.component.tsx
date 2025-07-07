"use client";

import {
  Select as SelectUi,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { SelectProps as SelectPrimitiveProps } from "@radix-ui/react-select";
import { cn } from "@/app/utils/cn.utils";

export type SelectItemsType = {
  value: string;
  label: string;
};

interface SelectProps extends Omit<SelectPrimitiveProps, "children"> {
  value?: string;
  onValueChange?(value: string): void;
  placeholder?: string;
  items: Array<SelectItemsType>;
  disabled?: boolean;
  onReset?: () => void;
  onBlur?: () => void;
  classNameSelectContent?: string;
  classNameSelectTrigger?: string;
  id?: string;
}

export const Select = ({
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Selecione...",
  items = [],
  disabled = false,
  onReset,
  classNameSelectContent,
  classNameSelectTrigger,
  onBlur,
  id,
  ...props
}: SelectProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <SelectUi
        onValueChange={onValueChange}
        disabled={disabled}
        value={value}
        {...props}
      >
        <div className="gradient-border-input p-[2px] rounded-md flex justify-center items-center">
          <SelectTrigger
            onReset={onReset}
            className={cn(classNameSelectTrigger)}
            onBlur={onBlur}
            id={id}
          >
            <SelectValue
              placeholder={placeholder}
              aria-label={value}
              defaultValue={defaultValue}
            />
          </SelectTrigger>
        </div>
        <SelectContent className={cn(classNameSelectContent)}>
          {items.map((item, index) => (
            <SelectItem key={`${item.value}-${index}`} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectUi>
    </div>
  );
};
