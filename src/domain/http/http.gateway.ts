import { HttpOptions } from "./http.dto";

export interface HttpGateway {
  get<T>(url: string, options?: Omit<HttpOptions, "body">): Promise<T>;
  post<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T>;
  put<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T>;
  patch<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T>;
  delete<T>(url: string, options?: Omit<HttpOptions, "body">): Promise<T>;
  invalidateCacheByTag(tag: string): Promise<void>;
}
