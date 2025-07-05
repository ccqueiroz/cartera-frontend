import { CookieOptions } from "@/domain/core/storage/cookies.dto";
import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { cookies as nextCookies } from "next/headers";

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

  async recover<T>(key: string): Promise<T | null> {
    const data = (await this.cookies).get(key);
    if (!data || !data?.value) return null;

    return this.parseStringToRequiredType<T>(data.value);
  }

  async save<T>(
    key: string,
    data: T,
    options?: Partial<CookieOptions>
  ): Promise<void> {
    const value = typeof data === "string" ? data : JSON.stringify(data);
    (await this.cookies).set(key, value, options);
  }

  async delete(key: string): Promise<void> {
    (await this.cookies).delete(key);
  }
}
