import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const urlToFetch = `${baseUrl}${BASE_API_PATHS.AUTH.revalidate_session}`;

export async function POST(request: NextRequest) {
  const token = request.cookies.get(flagsCookies.REFRESH_AUTH)?.value;

  if (!token) {
    return NextResponse.json(
      { message: DomainMessageList.TOKEN_MISSING },
      { status: 401 }
    );
  }

  const refreshToken = await fetch(urlToFetch, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: `refresh_session=${token}`,
    },
  });

  return refreshToken;
}
