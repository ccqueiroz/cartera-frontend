import { cookies as nextCookies } from "next/headers";

import { CookiesGateway } from "@/domain/core/Storage/cookies.gateway";
import { CookieOptions } from "@/domain/core/Storage/cookies.dto";

export class CookieServerStorage implements CookiesGateway {
  constructor(private readonly cookies = nextCookies()) {}

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
