import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { GetPersonUserByUserIdUseCase } from "./getPersonUserByUserId.usecase";
import { PersonUserDTO } from "@/domain/personUser/personUser.dto";
import { GetPersonUserByUserIdService } from "@/service/personUser/getPersonUserByUserId.service";

describe("GetPersonUserByUserIdUseCase", () => {
  let usecase: GetPersonUserByUserIdUseCase;
  let HandleResponseGatewayMock: jest.Mocked<HandleResponseGateway>;
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
    HandleResponseGatewayMock = {
      execute: jest.fn(),
    };

    getPersonUserByUseridServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPersonUserByUserIdService>;

    usecase = new GetPersonUserByUserIdUseCase(
      HandleResponseGatewayMock,
      getPersonUserByUseridServiceMock
    );
  });

  it("should return person user when userId is valid", async () => {
    getPersonUserByUseridServiceMock.execute.mockResolvedValue(fakePersonUser);

    HandleResponseGatewayMock.execute.mockImplementation((fn) =>
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

    expect(HandleResponseGatewayMock.execute).toHaveBeenCalled();
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

    expect(HandleResponseGatewayMock.execute).not.toHaveBeenCalled();
    expect(getPersonUserByUseridServiceMock.execute).not.toHaveBeenCalled();
  });

  it("should handle failure from HandleResponseGateway", async () => {
    HandleResponseGatewayMock.execute.mockResolvedValue({
      success: false,
      error: "Not Found",
    });

    getPersonUserByUseridServiceMock.execute.mockResolvedValue(fakePersonUser);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    HandleResponseGatewayMock.execute.mockImplementation((fn) =>
      Promise.resolve(fn()).then((_) => ({
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
