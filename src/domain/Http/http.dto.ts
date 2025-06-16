export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpOptions = {
  tags?: string[];
  cache?: "default" | "force-cache" | "no-store" | "reload" | "no-cache";
  signal?: AbortSignal | undefined;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
};
