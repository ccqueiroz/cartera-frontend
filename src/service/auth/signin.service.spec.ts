import { SignInService } from "@/service/auth/signin.service";
import { AuthDTO } from "@/domain/auth/auth.dto";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

describe("SignInService", () => {
  const httpPostMock = jest.fn();

  const service = new SignInService(httpPostMock);

  const input = {
    email: "test@email.com",
    password: "password123",
  };

  const authResponse: AuthDTO = {
    email: input.email,
    userId: "user-id",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expirationTime: Date.now() + 1000 * 60 * 60,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call http.post with correct params and return response", async () => {
    httpPostMock.mockResolvedValueOnce(authResponse);

    const result = await service.execute(input);

    expect(result).toEqual(authResponse);

    expect(httpPostMock).toHaveBeenCalledWith(
      BASE_API_PATHS.AUTH.login,
      {
        email: input.email,
        password: input.password,
      },
      {
        cache: "no-store",
      }
    );
  });

  it("should propagate errors from http.post", async () => {
    const error = new Error("Request failed");
    httpPostMock.mockRejectedValueOnce(error);

    await expect(service.execute(input)).rejects.toThrow("Request failed");

    expect(httpPostMock).toHaveBeenCalledWith(
      BASE_API_PATHS.AUTH.login,
      {
        email: input.email,
        password: input.password,
      },
      {
        cache: "no-store",
      }
    );
  });
});
