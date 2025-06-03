import React from "react";
import { HeaderPrivate } from "./components/core/Header/index.component";

export default function LayoutPrivateDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderPrivate />
      {children}
    </div>
  );
}
