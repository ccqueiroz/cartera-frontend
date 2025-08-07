"use server";

import { HandleProxy } from "@/app/actions/handleProxy/handleProxy.service";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { PersonUserDTO } from "@/domain/personUser/personUser.dto";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { GetPersonUserByUserIdService } from "@/service/personUser/getPersonUserByUserId.service";
import { GetPersonUserByUserIdUseCase } from "@/usecase/personUser/getPersonUserByUserId.usecase";
import { cookies } from "next/headers";

export async function getDataPersonUser() {
  const storage = new CookieServerStorage(await cookies());

  const service = new GetPersonUserByUserIdService(
    (await httpInfraFactory(storage)).get
  );

  const usecase = new GetPersonUserByUserIdUseCase(
    handleResponseFactory,
    service
  );

  const getUserId = storage.recover<{
    email: string;
    userId: string;
  } | null>(flagsCookies.PERSON_USER_AUTH);

  const response = await HandleProxy({
    request: () =>
      usecase.execute({
        userId: getUserId?.userId ?? "",
        tagToCache: [TAGS_CACHE_ROUTES.PERSON_USER.get_full_name_and_image],
      }),
    isAuthService: false,
    storage,
  });

  const responseJson =
    (await response?.json()) as HandleResponseDTO<PersonUserDTO>;

  return responseJson;
}
