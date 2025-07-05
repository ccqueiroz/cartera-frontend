import { HttpInfra } from "@/infra/http/http.infra";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { cookiesFactory } from "../storage/cookies.factory";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error(DomainMessageList.NEXT_PUBLIC_API_URL_NOT_FOUND);
}

export const httpInfraFactory = async () => {
  const storage = await cookiesFactory();

  return new HttpInfra(baseUrl, storage);
};
