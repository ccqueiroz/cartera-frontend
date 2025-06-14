import React from "react";
import { HeaderPrivate } from "./_views/Header/header.view";
import { Footer } from "./_views/Footer/footer.view";

export default function LayoutPrivateDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container w-full h-full flex flex-col gap-4 p-1 pb-20 sm:p-4 sm:pb-20">
      <HeaderPrivate />
      {children}
      <Footer />
    </div>
  );
}
