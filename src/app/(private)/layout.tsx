import React from "react";
import { HeaderPrivate } from "./_views/Header/header.view";

export default function LayoutPrivateDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container w-full h-full flex flex-col gap-4 p-1 sm:p-4">
      <HeaderPrivate />
      {children}
    </div>
  );
}
