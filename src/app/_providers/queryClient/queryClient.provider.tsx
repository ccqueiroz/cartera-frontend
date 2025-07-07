"use client";

import { makeQueryClient } from "@/app/lib/react-query/queryClient.lib";
import { QueryClientProvider as QueryClientProviderTanstack } from "@tanstack/react-query";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = makeQueryClient();

  return (
    <QueryClientProviderTanstack client={queryClient}>
      {children}
    </QueryClientProviderTanstack>
  );
};
