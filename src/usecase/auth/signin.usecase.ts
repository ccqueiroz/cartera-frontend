import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { Usecase } from "../usecase";
import { AuthDTO } from "@/domain/auth/auth.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { SignInService } from "@/service/auth/signin.service";
import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";

type InputDTO = { email: string; password: string; keepSession: boolean };

export class SignInUseCase
  implements Usecase<InputDTO, Promise<HandleResponseDTO<AuthDTO>>>
{
  private MAX_AGE_KEEP_SESSION = 60 * 60 * 24 * 7;
  private MAX_AGE_REFRESH_SESSION = 60 * 60 * 24 * 7;

  constructor(
    private readonly HandleResponseGateway: HandleResponseGateway,
    private readonly signInService: SignInService,
    private readonly storage: CookiesGateway
  ) {}

  private defineExpiresAuthCookie(
    keepSession: boolean,
    expirationTime?: number
  ) {
    return keepSession && expirationTime ? new Date(expirationTime) : undefined;
  }

  private saveCookieKeepSession(keepSession: boolean) {
    if (keepSession) {
      this.storage.save(flagsCookies.KEEP_SESSION, keepSession, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        ...(keepSession ? { maxAge: this.MAX_AGE_KEEP_SESSION } : {}),
      });
    }
  }

  private saveCookieAuthSession(
    accessToken: string | undefined,
    keepSession: boolean,
    expirationTime?: number
  ) {
    if (accessToken) {
      this.storage.save(flagsCookies.AUTH, accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        expires: this.defineExpiresAuthCookie(keepSession, expirationTime),
      });
    }
  }

  private saveCookieRefreshAuthSession(refreshToken: string | undefined) {
    if (refreshToken) {
      this.storage.save(flagsCookies.REFRESH_AUTH, refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/auth/refresh-token",
        secure: true,
        maxAge: this.MAX_AGE_REFRESH_SESSION,
      });
    }
  }

  private saveCookiePersonUserData(email?: string, userId?: string) {
    if (email && userId) {
      this.storage.save(
        flagsCookies.PERSON_USER_AUTH,
        { email, userId },
        {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
          maxAge: this.MAX_AGE_KEEP_SESSION,
        }
      );
    }
  }

  async execute({
    email,
    password,
    keepSession,
  }: InputDTO): Promise<HandleResponseDTO<AuthDTO>> {
    const response = await this.HandleResponseGateway.execute(() =>
      this.signInService.execute({ email, password })
    );

    if (!response.success) return response;

    await Promise.allSettled([
      this.saveCookieKeepSession(keepSession),
      this.saveCookieAuthSession(
        response.data?.accessToken,
        keepSession,
        response?.data?.expirationTime
      ),
      this.saveCookieRefreshAuthSession(response?.data?.refreshToken),
      this.saveCookiePersonUserData(
        response.data?.email,
        response.data?.userId
      ),
    ]);

    return response;
  }
}
