import { CookieOptions } from "../cookies.dto";

export interface CookiesGateway {
  recover(key: string): string | null;
  save<T>(key: string, data: T, options?: Partial<CookieOptions>): void;
  delete(key: string | Array<string>): void;
}
