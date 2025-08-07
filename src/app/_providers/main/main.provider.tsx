import React from "react";
import { ProgressBarProvider } from "../progressBar/progressBar.provider";
import { Toaster } from "sonner";
import { QueryClientProvider } from "../queryClient/queryClient.provider";
import { ModalProvider } from "../modal/modal.components";
import { AuthProvider } from "../auth/auth.provider";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <QueryClientProvider>
        <AuthProvider>
          <ProgressBarProvider>{children}</ProgressBarProvider>
        </AuthProvider>
        <Toaster closeButton expand={false} position="top-right" richColors />
        <ModalProvider />
      </QueryClientProvider>
    </main>
  );
}
