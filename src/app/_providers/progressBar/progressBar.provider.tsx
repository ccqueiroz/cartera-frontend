"use client";

import { ProgressProvider } from "@bprogress/next/app";

export const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#7DF9FF"
      options={{ showSpinner: false }}
      shallowRouting
      memo
      style="background: linear-gradient(90deg, #7DF9FF 0%, #A77DFB 50%, #C084FC 100%);"
      disableSameURL={false}
    >
      {children}
    </ProgressProvider>
  );
};
