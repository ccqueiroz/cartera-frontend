"use client";

import { NeonButton } from "@/app/components/core/neonButton/neonButton.component";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/app/utils/cn.utils";
import { Bell } from "lucide-react";
import { useMemo } from "react";

interface NotificationsButtonsProps {
  disabled?: boolean;
  className?: string;
}

const notifications = 0; //todo remover

export const NotificationsButtons = ({
  className,
  disabled = true,
}: NotificationsButtonsProps) => {
  const amountNotifications = useMemo(() => {
    return notifications > 99 ? "+99" : notifications;
  }, []);

  const showAmountNotifications = useMemo(() => {
    return notifications > 0 && !disabled;
  }, [disabled]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NeonButton
          disabled={disabled}
          variant="ghost"
          size="sm"
          className={cn("relative hidden sm:block", className)}
        >
          <Bell size={18} className="text-white/80" />
          {showAmountNotifications && (
            <span className="w-max h-max min-w-6 min-h-6 absolute -top-3 -right-3 bg-neon-purple rounded-full text-[10px] flex items-center justify-center animate-pulse-neon">
              {amountNotifications}
            </span>
          )}
        </NeonButton>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
