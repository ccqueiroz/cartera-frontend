import { RegisterService } from "@/service/auth/register.service";
import { RegisterAuthDTO } from "@/domain/auth/auth.dto";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

describe("RegisterService", () => {
  const httpPostMock = jest.fn();

  const service = new RegisterService(httpPostMock);

  const input = {
    email: "test@email.com",
    password: "password123",
    confirmPassword: "password123",
    firstName: "Test",
    lastName: "User",
  };

  const registerResponse: RegisterAuthDTO = {
    email: input.email,
    userId: "user-id",
    firstName: input.firstName,
    lastName: input.lastName,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    id: "account-id",
    fullName: `${input.firstName} ${input.lastName}`,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call http.post with correct params and return response", async () => {
    httpPostMock.mockResolvedValueOnce(registerResponse);

    const result = await service.execute(input);

    expect(result).toEqual(registerResponse);

    expect(httpPostMock).toHaveBeenCalledWith(
      BASE_API_PATHS.AUTH.register_account,
      {
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
        firstName: input.firstName,
        lastName: input.lastName,
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
      BASE_API_PATHS.AUTH.register_account,
      {
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
        firstName: input.firstName,
        lastName: input.lastName,
      },
      {
        cache: "no-store",
      }
    );
  });
});
