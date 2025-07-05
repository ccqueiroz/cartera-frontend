import React from "react";
import { ProgressBar } from "../progressBar/progressBar.component";
import { Toaster } from "sonner";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <ProgressBar>{children}</ProgressBar>
      <Toaster closeButton expand={false} position="top-right" richColors />
    </main>
  );
}
