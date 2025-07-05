import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { RecoverPasswordUseCase } from "./recoverPassword.usecase";
import { HttpGateway } from "@/domain/http/http.gateway";
import { RecoverPasswordService } from "@/service/auth/recoverPassword.service";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { RecoverPasswordAuthDTO } from "@/domain/auth/auth.dto";

describe("RecoverPasswordUseCase", () => {
  const HandleResponseGatewayMock: jest.Mocked<HandleResponseGateway> = {
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
      HandleResponseGatewayMock,
      recoverPasswordService
    );
  });

  it("should return error response when register fails", async () => {
    const errorResponse: HandleResponseDTO<RecoverPasswordAuthDTO> = {
      success: false,
      error: "E-mail not found",
    };

    HandleResponseGatewayMock.execute.mockResolvedValueOnce(errorResponse);

    const result = await recoverPasswordUseCase.execute(input);

    expect(result).toEqual(errorResponse);
  });

  it("should return successful response when register finalized with success", async () => {
    const successResponse: HandleResponseDTO<RecoverPasswordAuthDTO> = {
      success: true,
      data: recoverPasswordhDTO,
    };

    HandleResponseGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await recoverPasswordUseCase.execute(input);

    expect(result).toEqual(successResponse);
  });
});
