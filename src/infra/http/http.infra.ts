import { CookiesGateway } from "@/domain/core/Storage/cookies.gateway";
import { flagsCookies } from "@/domain/core/Storage/flags-cookies.constants";
import { HttpMethod, HttpOptions } from "@/domain/Http/http.dto";
import { HttpError } from "@/domain/Http/http.erro.entitie";
import { HttpGateway } from "@/domain/Http/http.gateway";
import { revalidateTag } from "next/cache";

export class HttpInfra implements HttpGateway {
  constructor(
    private readonly baseUrl: string,
    private readonly storage: CookiesGateway
  ) {}

  private buildUrl(path: string, params?: Record<string, unknown>) {
    const url = new URL(path, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(param, String(value));
        }
      });
    }

    return url.toString();
  }

  private buildHeaders(headers?: Record<string, string>) {
    const token = this.storage.recover(flagsCookies.AUTH);

    return {
      "Content-Type": "application/json",
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(
    path: string,
    method: HttpMethod,
    options: HttpOptions = {}
  ): Promise<T> {
    const { body, cache, headers, tags, params, signal, revalidate } = options;
    const buildurl = this.buildUrl(path, params);

    const response = await fetch(buildurl, {
      method,
      body: ["POST", "PUT", "PATCH"].includes(method)
        ? JSON.stringify(body)
        : undefined,
      headers: this.buildHeaders(headers),
      signal,
      next:
        tags || revalidate
          ? { ...(tags ? { tags } : {}), ...(revalidate ? { revalidate } : {}) }
          : undefined,
      cache: cache ?? "force-cache",
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      throw new HttpError(response.status, responseData?.message);
    }

    return response?.json();
  }

  get<T>(path: string, options?: HttpOptions) {
    return this.request<T>(path, "GET", options);
  }

  post<T>(path: string, options?: HttpOptions) {
    return this.request<T>(path, "POST", options);
  }

  put<T>(path: string, options?: HttpOptions) {
    return this.request<T>(path, "PUT", options);
  }

  patch<T>(path: string, options?: HttpOptions) {
    return this.request<T>(path, "PATCH", options);
  }

  delete<T>(path: string, options?: HttpOptions) {
    return this.request<T>(path, "DELETE", options);
  }

  async invalidateCacheByTag(tag: string) {
    revalidateTag(tag);
  }
}
