import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { HttpInfra } from "./http.infra";
import { revalidateTag } from "next/cache";
import { HttpError } from "@/domain/http/http.erro.entitie";

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

describe("HttpInfra", () => {
  let http: HttpInfra;
  let storageMock: jest.Mocked<CookiesGateway>;
  const baseUrl = "https://api.example.com";

  beforeEach(() => {
    storageMock = {
      recover: jest.fn(),
    } as unknown as jest.Mocked<CookiesGateway>;

    http = new HttpInfra(baseUrl, storageMock);

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should build URL without params", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await http.get("/path");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: undefined,
        cache: "force-cache",
      })
    );
  });

  it("should build URL with query params", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const queries = { a: 1, b: "test", c: null, d: undefined };

    await http.get("/path", { queries });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path?a=1&b=test",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: undefined,
        cache: "force-cache",
      })
    );
  });

  it("should build URL with params", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await http.get("/path/:id", { params: { id: 2 } });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path/2",
      expect.any(Object)
    );
  });

  it("should build headers with Authorization when token exists", async () => {
    storageMock.recover.mockResolvedValue("token123");
    const headers = { "X-Custom": "abc" };

    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await http.get("/path", { headers });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer token123",
          "Content-Type": "application/json",
          "X-Custom": "abc",
        }),
      })
    );
  });

  it("should call fetch with correct parameters for POST, PUT, PATCH", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: true }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const body = { foo: "bar" };

    const resultPost = await http.post("/path", body);
    const resultPut = await http.put("/path/:id", body, { params: { id: 2 } });
    const resultPatch = await http.patch("/path/:id", body, {
      params: { id: 2 },
    });

    expect(resultPost).toEqual(true);
    expect(resultPut).toEqual(true);
    expect(resultPatch).toEqual(true);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      })
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path/2",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(body),
      })
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path/2",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify(body),
      })
    );
  });

  it("should throw HttpError on non-ok response", async () => {
    const fakeResponse = {
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ message: "Bad request" }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await expect(http.get("/path")).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw HttpError with null message if json parsing fails", async () => {
    const fakeResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await expect(http.get("/path")).rejects.toBeInstanceOf(HttpError);
  });

  it("delete calls request with DELETE and params", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(undefined),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const result = await http.delete("/path/:id", { params: { id: 2 } });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path/2",
      expect.objectContaining({
        method: "DELETE",
        body: undefined,
        cache: "force-cache",
      })
    );

    expect(result).toBeUndefined();
  });

  it("should call revalidateTag with the correct tag", async () => {
    await http.invalidateCacheByTag("my-tag");
    expect(revalidateTag).toHaveBeenCalledWith("my-tag");
  });
});
