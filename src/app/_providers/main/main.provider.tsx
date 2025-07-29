import React from "react";
import { ProgressBarProvider } from "../progressBar/progressBar.provider";
import { Toaster } from "sonner";
import { QueryClientProvider } from "../queryClient/queryClient.provider";
import { ModalProvider } from "../modal/modal.components";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <QueryClientProvider>
        <ProgressBarProvider>{children}</ProgressBarProvider>
        <Toaster closeButton expand={false} position="top-right" richColors />
        <ModalProvider />
      </QueryClientProvider>
    </main>
  );
}
