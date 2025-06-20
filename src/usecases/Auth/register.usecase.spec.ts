import { RegisterAuthDTO } from "@/domain/Auth/auth.dto";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { HttpGateway } from "@/domain/Http/http.gateway";
import { RegisterUseCase } from "./register.usecase";
import { RegisterService } from "@/service/Auth/register.service";

describe("RegisterUseCase", () => {
  const handleRequestGatewayMock: jest.Mocked<HandleRequestGateway> = {
    execute: jest.fn(),
  };

  const httpInfraMock: jest.Mocked<HttpGateway> = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    invalidateCacheByTag: jest.fn(),
  };

  const input = {
    email: "test@email.com",
    password: "123456",
    confirmPassword: "123456",
    firstName: "Jhon",
    lastName: "Doe",
  };

  const registerAuthDTO: RegisterAuthDTO = {
    email: "test@email.com",
    userId: "y7hjkj12Gkl2k111",
    firstName: "Jhon",
    lastName: "Doe",
    createdAt: new Date("2025-5-19").getTime(),
    updatedAt: null,
    id: "y7hjkj12Gkl2k124876",
    fullName: "Jhon Doe",
  };

  let registerUseCase: RegisterUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    const registerService = new RegisterService(httpInfraMock.post);

    registerUseCase = new RegisterUseCase(
      handleRequestGatewayMock,
      registerService
    );
  });

  it("should return error response when register fails", async () => {
    const errorResponse = {
      success: false,
      error: "User already exists",
      errorSchema: {},
      triggerAt: Date.now(),
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(errorResponse);

    const result = await registerUseCase.execute(input);

    expect(result).toEqual(errorResponse);
  });

  it("should return successful response when register finalized with success", async () => {
    const successResponse = {
      success: true,
      data: registerAuthDTO,
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await registerUseCase.execute(input);

    expect(result).toEqual(successResponse);
  });
});
