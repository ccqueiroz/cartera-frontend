"use server";

import { flagsCookies } from "@/domain/core/Storage/flags-cookies.constants";
import { getPersonUserByUserIdUseCaseFactory } from "@/factories/usecase/get-person-user-by-user-id.factory";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tags-cache-routes.constants";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";

export async function getDataPersonUser() {
  const cookiesStorage = new CookieServerStorage();

  const getUserId = cookiesStorage.recover<{
    email: string;
    userId: string;
  } | null>(flagsCookies.PERSON_USER_AUTH);

  const personUser = await getPersonUserByUserIdUseCaseFactory().execute({
    userId: getUserId?.userId ?? "",
    tagToCache: [TAGS_CACHE_ROUTES.PERSON_USER.get_full_name_and_image],
  });

  return personUser;
}
