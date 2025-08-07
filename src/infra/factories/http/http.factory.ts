"use server";

import { HttpInfra } from "@/infra/http/http.infra";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error(DomainMessageList.NEXT_PUBLIC_API_URL_NOT_FOUND);
}

export const httpInfraFactory = async (storage: CookieServerStorage) => {
  return new HttpInfra(baseUrl, storage);
};
