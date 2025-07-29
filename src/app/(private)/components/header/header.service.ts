"use server";

import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { cookiesFactory } from "@/infra/factories/storage/cookies.factory";
import { GetPersonUserByUserIdService } from "@/service/personUser/getPersonUserByUserId.service";
import { GetPersonUserByUserIdUseCase } from "@/usecase/personUser/getPersonUserByUserId.usecase";

export async function getDataPersonUser() {
  const storage = await cookiesFactory();

  const service = new GetPersonUserByUserIdService(
    (await httpInfraFactory()).get
  );

  const usecase = new GetPersonUserByUserIdUseCase(
    handleResponseFactory,
    service
  );

  const getUserId = storage.recover<{
    email: string;
    userId: string;
  } | null>(flagsCookies.PERSON_USER_AUTH);

  const personUser = await usecase.execute({
    userId: getUserId?.userId ?? "",
    tagToCache: [TAGS_CACHE_ROUTES.PERSON_USER.get_full_name_and_image],
  });

  return personUser;
}
