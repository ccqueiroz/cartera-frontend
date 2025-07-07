import * as React from "react";

import { cn } from "@/app/lib/cn.utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="w-full h-full group relative">
        <div
          className={cn(
            "h-8 w-full absolute top-[0.5rem] rounded-md",
            "opacity-0 group-focus-within:opacity-100",
            "gradient-border-input blur-md",
            "transition-opacity duration-150"
          )}
        />
        <div className="w-full h-full rounded-md p-px relative gradient-border-input">
          <input
            type={type}
            className={cn(
              "flex h-10 w-full px-3 py-2",
              "rounded-md",
              "bg-background text-base ring-offset-background",
              "bg-clip-padding border border-transparent",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
