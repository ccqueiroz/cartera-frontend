import * as React from "react";

import { UserCircle } from "lucide-react";
import { cn } from "@/app/utils/cn.utils";
import {
  AvatarFallback,
  AvatarImage,
  AvatarUi,
} from "@/app/components/ui/avatar";

export interface AvatarCoreProps {
  src?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarCoreProps>(
  ({ ...props }, ref) => {
    return (
      <div className="rounded-full gradient-border-input p-[2px]">
        <div className="rounded-full bg-background/80">
          <div
            className={cn(
              "w-12 h-12",
              "rounded-full cursor-pointer",
              "flex items-center justify-center"
            )}
          >
            <AvatarUi ref={ref} {...props} className="w-10 h-10">
              {props.src && <AvatarImage src={props.src} />}
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
        </div>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
