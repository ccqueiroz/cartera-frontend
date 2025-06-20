import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { HttpGateway } from "@/domain/Http/http.gateway";
import { RecoverPasswordUseCase } from "./recover-password.usecase";
import { RecoverPasswordService } from "@/service/Auth/recover-password.service";

describe("RecoverPasswordUseCase", () => {
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
  };

  const recoverPasswordhDTO = {
    email: "test@email.com",
  };

  let recoverPasswordUseCase: RecoverPasswordUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    const recoverPasswordService = new RecoverPasswordService(
      httpInfraMock.post
    );

    recoverPasswordUseCase = new RecoverPasswordUseCase(
      handleRequestGatewayMock,
      recoverPasswordService
    );
  });

  it("should return error response when register fails", async () => {
    const errorResponse = {
      success: false,
      error: "E-mail not found",
      errorSchema: {},
      triggerAt: Date.now(),
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(errorResponse);

    const result = await recoverPasswordUseCase.execute(input);

    expect(result).toEqual(errorResponse);
  });

  it("should return successful response when register finalized with success", async () => {
    const successResponse = {
      success: true,
      data: recoverPasswordhDTO,
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await recoverPasswordUseCase.execute(input);

    expect(result).toEqual(successResponse);
  });
});
