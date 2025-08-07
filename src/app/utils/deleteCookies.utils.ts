import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const deleteCookiesWhenRedirected = (cookies: ResponseCookies) => {
  cookies.delete(flagsCookies.REFRESH_AUTH);
  cookies.delete(flagsCookies.AUTH);
  cookies.delete(flagsCookies.PERSON_USER_AUTH);
  cookies.delete(flagsCookies.PERSON_USER_DATA);
  cookies.delete(flagsCookies.KEEP_SESSION);
};
