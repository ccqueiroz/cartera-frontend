"use server";

import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { ParseCookiesHelper } from "@/infra/helpers/parseCookies.infra";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { NextResponse } from "next/server";

type HandleProxyProps<T> = {
  request: () => Promise<HandleResponseDTO<T>>;
  isAuthService: boolean;
  storage: CookieServerStorage;
};

const NEXT_SERVER_URL = process.env.NEXT_SERVER_URL;

export async function HandleProxy<T>({
  request,
  isAuthService,
  storage,
}: HandleProxyProps<T>): Promise<NextResponse<HandleResponseDTO<T>>> {
  let retray = false;
  let proxy = await request();

  if (proxy.status === 401 && !isAuthService) {
    const refreshTokenCookies = storage.recover(flagsCookies.REFRESH_AUTH);

    let redirectInvalidCredential = false;

    const refreshToken = await fetch(
      `${NEXT_SERVER_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `refresh_session=${refreshTokenCookies}`,
        },
      }
    );

    if (!refreshToken.ok) {
      redirectInvalidCredential = true;
    }

    const parseCookiesHelper = new ParseCookiesHelper();
    const newCookies = parseCookiesHelper.execute(
      refreshToken.headers.getSetCookie()
    );

    const newSession = newCookies.session;

    if (!newSession) {
      redirectInvalidCredential = true;
    }
    try {
      if (redirectInvalidCredential) {
        storage.delete(flagsCookies.AUTH);
        storage.delete(flagsCookies.PERSON_USER_AUTH);
        storage.delete(flagsCookies.PERSON_USER_DATA);
        storage.delete(flagsCookies.KEEP_SESSION);
        storage.delete(flagsCookies.REFRESH_AUTH);

        storage.save(
          flagsCookies.INVALID_CREDENTIAL,
          DomainMessageList.ERROR_RENEWING_SESSION,
          {
            path: "/",
            maxAge: 60,
          }
        );

        return NextResponse.json({
          success: false,
          error: DomainMessageList.ERROR_RENEWING_SESSION,
          status: 401,
        });
      }

      retray = true;

      storage.save(flagsCookies.AUTH, newSession, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: +newCookies["Max-Age"] || 3600,
      });
    } catch {
      storage.save(
        flagsCookies.INVALID_CREDENTIAL,
        DomainMessageList.ERROR_RENEWING_SESSION,
        {
          path: "/",
          maxAge: 60,
        }
      );

      return NextResponse.json({
        success: false,
        error: DomainMessageList.ERROR_RENEWING_SESSION,
        status: 401,
      });
    }
  }

  if (retray) {
    proxy = await request();
  }

  return NextResponse.json(proxy);
}
