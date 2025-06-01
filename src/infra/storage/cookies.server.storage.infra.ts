import { cookies as nextCookies } from "next/headers";

import { CookiesGateway } from "@/domain/core/Storage/gateway/cookies.gateway";
import { CookieOptions } from "@/domain/core/Storage/cookies.dto";

export class CookieServerStorage implements CookiesGateway {
  constructor(private readonly cookies = nextCookies()) {}

  recover<T>(key: string): T | null {
    const data = this.cookies.get(key);

    if (!data || !data?.value) return null;

    return JSON.parse(data?.value);
  }

  save<T>(key: string, data: T, options?: Partial<CookieOptions>): void {
    this.cookies.set(key, JSON.stringify(data), options);
  }

  delete(key: string): void {
    this.cookies.delete(key);
  }
}
