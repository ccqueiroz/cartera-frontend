"use client";

import * as React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Content as TooltipContentPrimitive } from "@radix-ui/react-tooltip";
import { cn } from "@/app/utils/cn.utils";

const variantClasses = {
  solid: "bg-popover-solid text-popover-foreground",
  info: "bg-blue-100 text-blue-800",
  warn: "bg-yellow-100 text-yellow-800",
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
};

interface TooltipContentExtendedProps
  extends React.ComponentPropsWithoutRef<typeof TooltipContentPrimitive> {
  variant?: keyof typeof variantClasses;
}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipContentPrimitive>,
  TooltipContentExtendedProps
>(({ className, sideOffset = 4, variant = "solid", ...props }, ref) => (
  <TooltipContentPrimitive
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      variantClasses[variant],
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
