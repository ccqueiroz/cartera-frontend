"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/app/lib/cn.utils";

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <div className="relative w-11 h-6 p-2 mx-auto my-auto rounded-full flex justify-center items-center overflow-hidden scale-95">
    <div
      className={cn(
        "h-[25px] w-[45px]",
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]",
        "rounded-full gradient-border-input  opacity-95"
      )}
    />
    <SwitchPrimitives.Root
      className={cn(
        "w-[42px] h-[22px] peer inline-flex items-center shrink-0",
        "bg-background border-2",
        "rounded-full border-transparen",
        "cursor-pointer transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#1e1e1f]",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-[18px] w-[18px] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitives.Root>
    {/* </div> */}
  </div>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
