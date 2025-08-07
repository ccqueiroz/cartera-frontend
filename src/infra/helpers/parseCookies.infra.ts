import { ParseCookiesGateway } from "@/domain/core/helpers/parseCookies.gateway";

export class ParseCookiesHelper implements ParseCookiesGateway {
  execute(cookies: Array<string>): Record<string, string> {
    const buildCookies: Record<string, string> = {};

    for (const cookie of cookies) {
      const chunks = cookie.split(";");
      for (const chunk of chunks) {
        const [key, ...value] = chunk.trim().split("=");

        buildCookies[key] = value.join("=");
      }
    }

    return buildCookies;
  }
}
