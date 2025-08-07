export interface ParseCookiesGateway {
  execute(cookies: Array<string>): Record<string, string>;
}
