import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./infra/constants/routes.constants";
import { flagsCookies } from "./domain/core/storage/flagsCookies.constants";

type PublicRoutes = {
  path: string;
  whenAthenticated: "redirect" | "next";
};

const REDIRECT_WHEN_NOT_AUTHENTICATED = ROUTES.PUBLIC.home;

const publicRoutes: Array<PublicRoutes> = [
  { path: ROUTES.PUBLIC.home, whenAthenticated: "redirect" },
  { path: ROUTES.PUBLIC.login, whenAthenticated: "redirect" },
  { path: ROUTES.PUBLIC.recover_password, whenAthenticated: "redirect" },
  { path: ROUTES.PUBLIC.register_account, whenAthenticated: "redirect" },
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);

  const authToken = request.cookies.get(flagsCookies.AUTH);

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = ROUTES.PRIVATE.dashboard;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
