import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { GetValueKeepSessionUseCase } from "./getValueKeepSession.usecase";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";


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

  it('should return true when "keep_session" cookie is "true"', async () => {
    storageMock.recover.mockResolvedValue("true");

    const result = await useCase.execute();

    expect(result).toBe(true);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });

  it('should return false when "keep_session" cookie is "false"', async () => {
    storageMock.recover.mockResolvedValue("false");

    const result = await useCase.execute();

    expect(result).toBe(false);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });

  it('should return false when "keep_session" cookie is null', async () => {
    storageMock.recover.mockResolvedValue(null);

    const result = await useCase.execute();

    expect(result).toBe(false);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });

  it('should return false when "keep_session" cookie has any unexpected value', async () => {
    storageMock.recover.mockResolvedValue("any-other-value");

    const result = await useCase.execute();

    expect(result).toBe(false);
    expect(storageMock.recover).toHaveBeenCalledWith(flagsCookies.KEEP_SESSION);
  });
});
