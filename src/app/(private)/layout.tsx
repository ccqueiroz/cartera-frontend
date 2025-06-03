import React from "react";
import { HeaderPrivate } from "./components/core/Header/header.component";
import { Sidebar } from "./components/core/Sidebar/sidebar.component";
import { SidebarProvider } from "@/components/ui/Sidebar/sidebar";
import SectionMain from "./components/core/SectionMain/section-main.components";

export default function LayoutPrivateDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="w-full h-full flex flex-col gap-4">
        <HeaderPrivate />
        <Sidebar />
        <SectionMain>{children}</SectionMain>
      </div>
    </SidebarProvider>
  );
}
