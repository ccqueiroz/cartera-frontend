import { Avatar } from "../Avatar/avatar.component";
import { Logo } from "@/app/(public)/components/Logo/logo.component";
import { cn } from "@/lib/cn.utils";
import { NotificationsButtons } from "../NotificationsButton/notifications-button.component";
import { GreetingComponent } from "../GreetingComponent/greeting-component.component";

export function HeaderPrivate() {
  return (
    <header
      aria-label="Header da página"
      className={cn(
        "flex flex-col justify-between p-4 mt-2 gap-5"
      )}
    >
      <div className={cn("flex justify-between items-center")}>
        <div className="flex items-center [&>div]:mb-0">
          <Logo />
        </div>
        <div className="flex items-center gap-5">
          <NotificationsButtons />
          <Avatar src="https://avatars.githubusercontent.com/u/61844259?s=96&v=4" />
        </div>
      </div>
      <div>
        <GreetingComponent />
      </div>
    </header>
  );
}
