import { QueryClient } from "@tanstack/react-query";

export const makeQueryClient = () => new QueryClient();

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = new QueryClient();
    return browserQueryClient;
  }
};
