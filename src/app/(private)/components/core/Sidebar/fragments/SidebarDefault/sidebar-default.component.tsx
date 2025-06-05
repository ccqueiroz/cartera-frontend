"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/Sidebar/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/core/Button";
import { SidebarProps } from "../../sidebar.component";

export const SidebarDefault = ({ items, settings }: SidebarProps) => {
  const { open, state } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      data-state={state}
      className={`${
        open ? "w-[15rem]" : "w-[4rem]"
      } absolute top-4 left-4 h-[96%] max-h-[calc(100vh-2rem)] transition-[width] duration-200 ease-linear`}
    >
      <div
        className={`w-16 h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] flex flex-col ${
          open ? "items-start" : "items-center"
        } gap-6 relative`}
      >
        <div
          className={`${
            open ? "w-[15rem]" : "w-[4rem]"
          } mt-5 transition-[width] duration-200 ease-linear relative`}
        >
          <SidebarTrigger className="fixed right-4 text-contrastTheme" />
        </div>
        <SidebarContent
          id="sidebar-content"
          className={`${open ? "w-[15rem]" : "w-[4rem]"} mt-8`}
        >
          <SidebarGroup>
            <SidebarGroupContent className="relative">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="w-full flex flex-col items-center text-contrastTheme mt-5"
                  >
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-accent hover:text-accent-foreground"
                      isActive={pathname === item.url}
                    >
                      <a href={item.url}>
                        <item.icon className="ml-2" />
                        {open && <span>{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                    <SidebarSeparator className="w-full bg-border" />
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="fixed bottom-8 w-full flex flex-col items-center text-contrastTheme left-0">
                  <Button
                    asChild
                    variant={open ? "quartenary" : "link"}
                    size={"sm"}
                    className="gap-[2px] text-contrastTheme bg-background hover:bg-accent hover:text-accent-foreground w-[48xp]"
                  >
                    <a href={settings.url} className="w-min">
                      <settings.icon className="mx-2" />
                      {open && <span>{settings.title}</span>}
                    </a>
                  </Button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </aside>
  );
};
