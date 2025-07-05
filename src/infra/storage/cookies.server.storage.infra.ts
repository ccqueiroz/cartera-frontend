import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { CookieOptions } from "@/domain/core/storage/cookies.dto";
import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { HttpError } from "@/domain/http/http.erro.entitie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export class CookieServerStorage implements CookiesGateway {
  constructor(private readonly cookies: ReadonlyRequestCookies) {
    if (!cookies)
      throw new HttpError(500, DomainMessageList.COOKIES_NOT_DEFINED);
  }

  private parseStringToRequiredType<T>(value: string) {
    try {
      const data = JSON.parse(value);
      return data satisfies T;
    } catch {
      return value as string;
    }
  }

  recover<T>(key: string): T | null {
    const data = this.cookies.get(key);
    if (!data || !data?.value) return null;

    return this.parseStringToRequiredType<T>(data.value);
  }

  save<T>(key: string, data: T, options?: Partial<CookieOptions>): void {
    const value = typeof data === "string" ? data : JSON.stringify(data);
    this.cookies.set(key, value, options);
  }

  delete(key: string): void {
    this.cookies.delete(key);
  }
}
