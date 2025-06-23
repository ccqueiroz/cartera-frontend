import { Logo } from "@/app/(public)/components/Logo/logo.component";
import { cn } from "@/lib/cn.utils";
import { Avatar } from "../../components/core/Avatar/avatar.component";
import { NotificationsButtons } from "../../components/core/NotificationsButton/notifications-button.component";
import { GreetingComponent } from "../../components/core/GreetingComponent/greeting-component.component";
import { getDataPersonUser } from "./header.service";

export async function HeaderPrivate() {
  const personUser = await getDataPersonUser();

  const personUserData = personUser.success ? personUser.data : null;

  return (
    <header
      aria-label="Header da página"
      className={cn("flex flex-col justify-between p-4 mt-2 gap-5")}
    >
      <div className={cn("flex justify-between items-center")}>
        <div className="flex items-center [&>div]:mb-0">
          <Logo />
        </div>
        <div className="flex items-center gap-5">
          <NotificationsButtons />
          <Avatar src={personUserData?.image ?? ""} />
        </div>
      </div>
      <div>
        <GreetingComponent name={personUserData?.fullName ?? ""} />
      </div>
    </header>
  );
}
