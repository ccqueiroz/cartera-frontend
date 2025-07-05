import { GetPersonUserByUserIdService } from "./getPersonUserByUserId.service";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { PersonUserDTO } from "@/domain/personUser/person-user.dto";

describe("GetPersonUserByUserIdService", () => {
  let service: GetPersonUserByUserIdService;
  let httpGetMock: jest.MockedFunction<HttpGateway["get"]>;

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
    httpGetMock = jest.fn();
    service = new GetPersonUserByUserIdService(httpGetMock);
  });

  it("should call http.get with correct params", async () => {
    httpGetMock.mockResolvedValue(fakePersonUser);

    const result = await service.execute({
      userId: "user-id",
      tagToCache: ["tag-1", "tag-2"],
    });

    expect(httpGetMock).toHaveBeenCalledWith(
      BASE_API_PATHS.PERSON_USER.list_by_user_id,
      {
        params: { id: "user-id" },
        tags: ["tag-1", "tag-2"],
        cache: "force-cache",
      }
    );

    expect(result).toEqual(fakePersonUser);
  });

  it("should use empty tagToCache when not provided", async () => {
    httpGetMock.mockResolvedValue(fakePersonUser);

    const result = await service.execute({
      userId: "user-id",
      tagToCache: [],
    });

    expect(httpGetMock).toHaveBeenCalledWith(
      BASE_API_PATHS.PERSON_USER.list_by_user_id,
      {
        params: { id: "user-id" },
        tags: [],
        cache: "force-cache",
      }
    );

    expect(result).toEqual(fakePersonUser);
  });

  it("should propagate errors from http.get", async () => {
    httpGetMock.mockRejectedValue(new Error("Network Error"));

    await expect(
      service.execute({ userId: "user-id", tagToCache: [] })
    ).rejects.toThrow("Network Error");

    expect(httpGetMock).toHaveBeenCalledWith(
      BASE_API_PATHS.PERSON_USER.list_by_user_id,
      {
        params: { id: "user-id" },
        tags: [],
        cache: "force-cache",
      }
    );
  });
});
