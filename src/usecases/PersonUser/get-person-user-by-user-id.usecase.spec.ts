import { GetPersonUserByUserIdUseCase } from "./get-person-user-by-user-id.usecase";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { GetPersonUserByUserIdService } from "@/service/PersonUser/get-person-user-by-user-id.service";
import { PersonUserDTO } from "@/domain/PersonUser/person-user.dto";

describe("GetPersonUserByUserIdUseCase", () => {
  let usecase: GetPersonUserByUserIdUseCase;
  let handleRequestGatewayMock: jest.Mocked<HandleRequestGateway>;
  let getPersonUserByUseridServiceMock: jest.Mocked<GetPersonUserByUserIdService>;

  const fakePersonUser: PersonUserDTO = {
    id: "person-id",
    userId: "user-id",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "john@example.com",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  beforeEach(() => {
    handleRequestGatewayMock = {
      execute: jest.fn(),
    };

    getPersonUserByUseridServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPersonUserByUserIdService>;

    usecase = new GetPersonUserByUserIdUseCase(
      handleRequestGatewayMock,
      getPersonUserByUseridServiceMock
    );
  });

  it("should return person user when userId is valid", async () => {
    getPersonUserByUseridServiceMock.execute.mockResolvedValue(fakePersonUser);

    handleRequestGatewayMock.execute.mockImplementation((fn) =>
      Promise.resolve(fn()).then((result) => ({ success: true, data: result }))
    );

    const result = await usecase.execute({
      userId: "user-id",
      tagToCache: ["tag-1"],
    });

    expect(getPersonUserByUseridServiceMock.execute).toHaveBeenCalledWith({
      userId: "user-id",
      tagToCache: ["tag-1"],
    });

    expect(handleRequestGatewayMock.execute).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      data: fakePersonUser,
    });
  });

  it("should return error if userId is empty", async () => {
    const result = await usecase.execute({
      userId: "",
      tagToCache: [],
    });

    expect(result).toEqual({
      success: false,
      error: "",
    });

    expect(handleRequestGatewayMock.execute).not.toHaveBeenCalled();
    expect(getPersonUserByUseridServiceMock.execute).not.toHaveBeenCalled();
  });

  it("should handle failure from handleRequestGateway", async () => {
    handleRequestGatewayMock.execute.mockResolvedValue({
      success: false,
      error: "Not Found",
    });

    getPersonUserByUseridServiceMock.execute.mockResolvedValue(fakePersonUser);

    handleRequestGatewayMock.execute.mockImplementation((fn) =>
      Promise.resolve(fn()).then((result) => ({
        success: false,
        error: "Not Found",
      }))
    );

    const result = await usecase.execute({
      userId: "user-id",
      tagToCache: [],
    });

    expect(getPersonUserByUseridServiceMock.execute).toHaveBeenCalledWith({
      userId: "user-id",
      tagToCache: [],
    });

    expect(result).toEqual({
      success: false,
      error: "Not Found",
    });
  });
});
