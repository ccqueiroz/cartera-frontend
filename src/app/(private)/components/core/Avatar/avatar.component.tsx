import {
  AvatarFallback,
  AvatarImage,
  AvatarUi,
} from "@/components/ui/Avatar/avatar";
import * as React from "react";

import { UserCircle } from "lucide-react";
import { cn } from "@/lib/cn.utils";

export interface AvatarCoreProps {
  src?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarCoreProps>(
  ({ ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-12 h-12",
          "rounded-full cursor-pointer",
          "bg-neon-blue/20 border border-neon-blue/30",
          "flex items-center justify-center animate-pulse-neon"
        )}
      >
        <AvatarUi ref={ref} {...props} className="w-10 h-10">
          <AvatarImage src={props.src} />
          <AvatarFallback>
            <div
              className={cn(
                "w-8 h-8 ",
                "text-contrastTheme",
                "flex justify-center items-center "
              )}
            >
              <UserCircle size={24} className="text-white" />
            </div>
          </AvatarFallback>
        </AvatarUi>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
