import { Logo } from "@/app/components/core/logo/logo.component";
import { cn } from "@/app/utils/cn.utils";
import { getDataPersonUser } from "./header.service";
import { NotificationsButtons } from "./components/notificationsButton/notificationsButton.component";
import { Avatar } from "../../components/avatar/avatar.component";
import { GreetingComponent } from "./components/greetingComponent/greeting-component.component";

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
          <Avatar src={personUserData?.image || undefined} />
        </div>
      </div>
      <div>
        <GreetingComponent name={personUserData?.fullName ?? ""} />
      </div>
    </header>
  );
}
