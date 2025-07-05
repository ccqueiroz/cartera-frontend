import { CookieOptions } from "./cookies.dto";

export interface CookiesGateway {
  recover(key: string): Promise<string | null>;
  save<T>(key: string, data: T, options?: Partial<CookieOptions>): Promise<void>;
  delete(key: string | Array<string>): Promise<void>;
}
