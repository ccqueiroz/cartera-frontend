import { HttpInfra } from "@/infra/http/http.infra";
import { cookiesStorageFactory } from "./cookies.infra.factory";
import { DomainMessageList } from "@/domain/core/Constants/domain-message-list.constants";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error(DomainMessageList.NEXT_PUBLIC_API_URL_NOT_FOUND);
}

let httpInfra: HttpInfra | null = null;

export const httpInfraFactory: HttpInfra = (() => {
  if (!httpInfra) {
    httpInfra = new HttpInfra(baseUrl, cookiesStorageFactory);
  }
  return httpInfra;
})();
