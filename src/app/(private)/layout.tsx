import React from "react";
import { HeaderPrivate } from "./components/core/Header/header.component";
import {
  SidebarProvider,
} from "@/components/ui/Sidebar/sidebar";

export default function LayoutPrivateDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="container w-full h-full flex flex-col gap-4">
        <HeaderPrivate />
        {children}
      </div>
    </SidebarProvider>
  );
}
