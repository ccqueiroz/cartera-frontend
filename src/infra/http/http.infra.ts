import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { HttpMethod, HttpOptions } from "@/domain/http/http.dto";
import { HttpError } from "@/domain/http/http.erro.entitie";
import { HttpGateway } from "@/domain/http/http.gateway";
import { revalidateTag } from "next/cache";

export class HttpInfra implements HttpGateway {
  constructor(
    private readonly baseUrl: string,
    private readonly storage: CookiesGateway
  ) {
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
  }

  private buildUrl(
    path: string,
    params?: Record<string, unknown>,
    queries?: Record<string, unknown>
  ) {
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        if (value !== undefined && value !== null) {
          path = path.replace(`:${param}`, String(value));
        }
      });
    }

    const url = new URL(path, this.baseUrl);

    if (queries) {
      Object.entries(queries).forEach(([queries, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(queries, String(value));
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
      ...(token ? { Cookie: `session=${token}` } : {}),
    };
  }

  private async request<T>(
    path: string,
    method: HttpMethod,
    options: HttpOptions = {}
  ): Promise<T> {
    const { body, cache, headers, tags, params, signal, revalidate, queries } =
      options;
    const buildurl = this.buildUrl(path, params, queries);

    const response = await fetch(buildurl, {
      method,
      body: ["POST", "PUT", "PATCH"].includes(method)
        ? JSON.stringify(body)
        : undefined,
      credentials: "include",
      headers: this.buildHeaders(headers),
      signal,
      next:
        tags || revalidate
          ? { ...(tags ? { tags } : {}), ...(revalidate ? { revalidate } : {}) }
          : undefined,
      cache: cache ?? (revalidate ? undefined : "force-cache"),
    });

    if (response.status === 204) {
      return { data: null, status: 204 } as T;
    }

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      throw new HttpError(response.status, responseData?.message);
    }

    return { data: responseData?.data, status: response.status } as T;
  }

  get<T>(path: string, options?: Omit<HttpOptions, "body">) {
    return this.request<T>(path, "GET", options);
  }

  post<T>(path: string, body: unknown, options?: HttpOptions) {
    return this.request<T>(path, "POST", {
      ...options,
      body,
    });
  }

  put<T>(path: string, body: unknown, options?: HttpOptions) {
    return this.request<T>(path, "PUT", {
      ...options,
      body,
    });
  }

  patch<T>(path: string, body: unknown, options?: HttpOptions) {
    return this.request<T>(path, "PATCH", {
      ...options,
      body,
    });
  }

  delete<T>(path: string, options?: Omit<HttpOptions, "body">) {
    return this.request<T>(path, "DELETE", options);
  }

  async invalidateCacheByTag(tag: string) {
    revalidateTag(tag);
  }
}
