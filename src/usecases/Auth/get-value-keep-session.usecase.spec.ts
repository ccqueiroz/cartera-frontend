import { GetValueKeepSessionUseCase } from "@/usecases/Auth/get-value-keep-session.usecase";
import { CookiesGateway } from "@/domain/core/Storage/cookies.gateway";
import { flagsCookies } from "@/domain/core/Storage/flags-cookies.constants";

describe("GetValueKeepSessionUseCase", () => {
  const storageMock: jest.Mocked<CookiesGateway> = {
    recover: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  let useCase: GetValueKeepSessionUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetValueKeepSessionUseCase(storageMock);
  });

  it('should return true when "keep_session" cookie is "true"', () => {
    storageMock.recover.mockReturnValue("true");

    const result = useCase.execute();

    expect(result).toBe(true);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });

  it('should return false when "keep_session" cookie is "false"', () => {
    storageMock.recover.mockReturnValue("false");

    const result = useCase.execute();

    expect(result).toBe(false);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });

  it('should return false when "keep_session" cookie is null', () => {
    storageMock.recover.mockReturnValue(null);

    const result = useCase.execute();

    expect(result).toBe(false);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });

  it('should return false when "keep_session" cookie has any unexpected value', () => {
    storageMock.recover.mockReturnValue("any-other-value");

    const result = useCase.execute();

    expect(result).toBe(false);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });
});
