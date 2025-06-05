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
import { Menu } from "lucide-react";

export const SidebarMobile = ({ items, settings }: SidebarProps) => {
  const { openMobile, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${
          openMobile ? "hidden" : "block"
        } absolute transition-[display] duration-200 ease-linear`}
      >
        <Menu
          className="fixed top-4 left-4 text-contrastTheme"
          onClick={toggleSidebar}
        />
      </div>
      <aside
        data-state={openMobile ? "expanded" : "collapsed"}
        className={`w-dvw ${
          openMobile ? "left-0" : "-left-full"
        } absolute h-screen transition-[width] duration-200 ease-linear`}
      >
        <div
          className={`w-dvw h-screen flex flex-col ${
            openMobile ? "items-start" : "items-center"
          } gap-6 relative`}
        >
          <div
            className={`${
              openMobile ? "w-[12rem]" : "w-[4rem]"
            } mt-5 transition-[width] duration-200 ease-linear relative`}
          >
            <SidebarTrigger className="fixed right-4 text-contrastTheme" />
          </div>
          <SidebarContent id="sidebar-content" className={`w-full mt-8`}>
            <SidebarGroup>
              <SidebarGroupContent className="relative">
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="w-full h-full flex flex-col items-center text-contrastTheme mt-5"
                    >
                      <SidebarMenuButton
                        asChild
                        className="h-full hover:bg-accent hover:text-accent-foreground"
                        isActive={pathname === item.url}
                      >
                        <a href={item.url}>
                          <item.icon className="ml-2" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      <SidebarSeparator className="w-full bg-border" />
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem className="fixed bottom-8 w-full flex flex-col items-center text-contrastTheme left-0">
                    <Button
                      asChild
                      variant={openMobile ? "quartenary" : "link"}
                      size={"sm"}
                      className="gap-[2px] text-contrastTheme bg-background hover:bg-accent hover:text-accent-foreground w-[48xp]"
                    >
                      <a href={settings.url} className="w-min">
                        <settings.icon className="mx-2" />
                        {openMobile && <span>{settings.title}</span>}
                      </a>
                    </Button>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </aside>
    </>
  );
};
