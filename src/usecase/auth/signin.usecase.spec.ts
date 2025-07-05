import { HandleRequestGateway } from "@/domain/core/api/handleRequest.gateway";
import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { HttpGateway } from "@/domain/http/http.gateway";
import { SignInUseCase } from "./signin.usecase";
import { AuthDTO } from "@/domain/auth/auth.dto";
import { SignInService } from "@/service/auth/signin.service";
import { HandleRequestDTO } from "@/domain/core/api/handleRequest.dto";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";

describe("SignInUseCase", () => {
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

  const storageMock: jest.Mocked<CookiesGateway> = {
    save: jest.fn(),
    recover: jest.fn(),
    delete: jest.fn(),
  };

  const input = {
    email: "test@email.com",
    password: "123456",
    keepSession: true,
  };

  const authDTO: AuthDTO = {
    email: input.email,
    userId: "user-1",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expirationTime: Date.now() + 1000 * 60 * 60,
  };

  let useCase: SignInUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    const siginService = new SignInService(httpInfraMock.post);

    useCase = new SignInUseCase(
      handleRequestGatewayMock,
      siginService,
      storageMock
    );
  });

  it("should return error response when login fails", async () => {
    const errorResponse: HandleRequestDTO<AuthDTO> = {
      success: false,
      error: "Invalid credentials",
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(errorResponse);

    const result = await useCase.execute(input);

    expect(result).toEqual(errorResponse);

    expect(storageMock.save).not.toHaveBeenCalled();
  });

  it("should save cookies and return success when login succeeds with keepSession true", async () => {
    const successResponse: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: authDTO,
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await useCase.execute(input);

    expect(result).toEqual(successResponse);

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.KEEP_SESSION,
      true,
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: expect.any(Number),
      })
    );

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.AUTH,
      authDTO.accessToken,
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        expires: expect.any(Date),
      })
    );

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.REFRESH_AUTH,
      authDTO.refreshToken,
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict",
        path: "/auth/refresh",
        secure: true,
        maxAge: expect.any(Number),
      })
    );
  });

  it("should not save keepSession cookie if keepSession is false", async () => {
    const successResponse: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: authDTO,
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await useCase.execute({ ...input, keepSession: false });

    expect(result).toEqual(successResponse);

    expect(storageMock.save).not.toHaveBeenCalledWith(
      flagsCookies.KEEP_SESSION,
      expect.anything(),
      expect.anything()
    );

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.AUTH,
      authDTO.accessToken,
      expect.any(Object)
    );

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.REFRESH_AUTH,
      authDTO.refreshToken,
      expect.any(Object)
    );
  });

  it("should save auth cookie without expires if expirationTime is undefined", async () => {
    const responseWithoutExpiration: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: {
        ...authDTO,
        expirationTime: undefined as unknown as number,
      },
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(
      responseWithoutExpiration
    );

    const result = await useCase.execute(input);

    expect(result).toEqual(responseWithoutExpiration);

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.AUTH,
      authDTO.accessToken,
      expect.not.objectContaining({ expires: expect.any(Date) })
    );
  });

  it("should not save auth cookie if accessToken is undefined", async () => {
    const responseWithoutAccessToken: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: {
        ...authDTO,
        accessToken: undefined as unknown as string,
      },
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(
      responseWithoutAccessToken
    );

    const result = await useCase.execute(input);

    expect(result).toEqual(responseWithoutAccessToken);

    expect(
      storageMock.save.mock.calls.find(([key]) => key === flagsCookies.AUTH)
    ).toBeUndefined();

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.KEEP_SESSION,
      true,
      expect.any(Object)
    );

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.REFRESH_AUTH,
      authDTO.refreshToken,
      expect.any(Object)
    );
  });

  it("should not save refresh cookie if refreshToken is undefined", async () => {
    const responseWithoutRefreshToken: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: {
        ...authDTO,
        refreshToken: undefined as unknown as string,
      },
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(
      responseWithoutRefreshToken
    );

    const result = await useCase.execute(input);

    expect(result).toEqual(responseWithoutRefreshToken);

    expect(
      storageMock.save.mock.calls.find(
        ([key]) => key === flagsCookies.REFRESH_AUTH
      )
    ).toBeUndefined();

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.KEEP_SESSION,
      true,
      expect.any(Object)
    );

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.AUTH,
      authDTO.accessToken,
      expect.any(Object)
    );
  });

  it("should save person user auth data when login succeeds and have the email attribute and userId attribute.", async () => {
    const successResponse: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: authDTO,
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await useCase.execute(input);

    expect(result).toEqual(successResponse);

    expect(storageMock.save).toHaveBeenCalledWith(
      flagsCookies.PERSON_USER_AUTH,
      { email: authDTO.email, userId: authDTO.userId },
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: expect.any(Number),
      })
    );
  });

  it("should not save person user auth data when login succeeds and dont have the email attribute and userId attribute.", async () => {
    const successResponse: HandleRequestDTO<AuthDTO> = {
      success: true,
      data: {
        ...authDTO,
        email: "",
        userId: "",
      },
    };

    handleRequestGatewayMock.execute.mockResolvedValueOnce(successResponse);

    const result = await useCase.execute(input);

    expect(result).toEqual(successResponse);

    expect(storageMock.save).not.toHaveBeenCalledWith(
      flagsCookies.PERSON_USER_AUTH,
      { email: authDTO.email, userId: authDTO.userId },
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: expect.any(Number),
      })
    );
  });
});
