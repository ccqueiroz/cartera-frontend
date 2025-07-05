import { CookieOptions } from "./cookies.dto";

export interface CookiesGateway {
  recover<T>(key: string): T | null;
  save<T>(key: string, data: T, options?: Partial<CookieOptions>): void;
  delete(key: string | Array<string>): void;
}
