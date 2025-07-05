import { RecoverPasswordService } from "@/service/auth/recoverPassword.service";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

describe("RecoverPasswordService", () => {
  const httpPostMock = jest.fn();

  const service = new RecoverPasswordService(httpPostMock);

  const input = {
    email: "test@email.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call http.post with correct params", async () => {
    httpPostMock.mockResolvedValueOnce(undefined);

    await expect(service.execute(input)).resolves.toBeUndefined();

    expect(httpPostMock).toHaveBeenCalledWith(
      BASE_API_PATHS.AUTH.recovery_password,
      { email: input.email },
      { cache: "no-store" }
    );
  });

  it("should propagate errors from http.post", async () => {
    const error = new Error("Request failed");

    httpPostMock.mockRejectedValueOnce(error);

    await expect(service.execute(input)).rejects.toThrow("Request failed");

    expect(httpPostMock).toHaveBeenCalledWith(
      BASE_API_PATHS.AUTH.recovery_password,
      { email: input.email },
      { cache: "no-store" }
    );
  });
});
