import { HttpInfra } from "./http.infra";
import { CookiesGateway } from "@/domain/core/Storage/cookies.gateway";
import { HttpError } from "@/domain/Http/http.erro.entitie";
import { revalidateTag } from "next/cache";

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

describe("HttpInfra", () => {
  let http: HttpInfra;
  let storageMock: jest.Mocked<CookiesGateway>;
  const baseUrl = "https://api.example.com";
  const path = "/test";
  const fullUrl = baseUrl + path;

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

  it("should build URL without params", () => {
    const url = (http as any).buildUrl("/path");
    expect(url).toBe("https://api.example.com/path");
  });

  it("should build URL with query params", () => {
    const url = (http as any).buildUrl("/path", {
      a: 1,
      b: "test",
      c: null,
      d: undefined,
    });
    expect(url).toBe("https://api.example.com/path?a=1&b=test");
  });

  it("should build headers with Authorization when token exists", () => {
    storageMock.recover.mockReturnValue("token123");
    const headers = (http as any).buildHeaders({ "X-Custom": "abc" });

    expect(headers).toEqual({
      "Content-Type": "application/json",
      "X-Custom": "abc",
      Authorization: "Bearer token123",
    });
  });

  it("should build headers without Authorization when no token", () => {
    storageMock.recover.mockReturnValue(null);
    const headers = (http as any).buildHeaders({ "X-Custom": "abc" });

    expect(headers).toEqual({
      "Content-Type": "application/json",
      "X-Custom": "abc",
    });
  });

  it("should call fetch with correct parameters for GET without body", async () => {
    storageMock.recover.mockReturnValue("token123");
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const result = await (http as any).request(path, "GET");

    expect(global.fetch).toHaveBeenCalledWith(
      fullUrl,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer token123",
          "Content-Type": "application/json",
        }),
        body: undefined,
        cache: "force-cache",
      })
    );

    expect(result).toEqual({ data: 123 });
  });

  it("should stringify body for POST, PUT, PATCH", async () => {
    storageMock.recover.mockReturnValue(null);
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const body = { foo: "bar" };

    for (const method of ["POST", "PUT", "PATCH"] as const) {
      const result = await (http as any).request(path, method, { body });
      expect(global.fetch).toHaveBeenCalledWith(
        fullUrl,
        expect.objectContaining({
          method,
          body: JSON.stringify(body),
        })
      );
      expect(result).toEqual({ success: true });
    }
  });

  it("should include params in url", async () => {
    storageMock.recover.mockReturnValue(null);
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ ok: true }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await (http as any).request(path, "GET", { params: { q: "search" } });

    expect(global.fetch).toHaveBeenCalledWith(
      baseUrl + "/test?q=search",
      expect.any(Object)
    );
  });

  it("should throw HttpError on non-ok response", async () => {
    storageMock.recover.mockReturnValue(null);
    const fakeResponse = {
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ message: "Bad request" }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await expect((http as any).request(path, "GET")).rejects.toBeInstanceOf(
      HttpError
    );
  });

  it("should throw HttpError with null message if json parsing fails", async () => {
    storageMock.recover.mockReturnValue(null);
    const fakeResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await expect((http as any).request(path, "GET")).rejects.toBeInstanceOf(
      HttpError
    );
  });

  it("get calls request with GET", async () => {
    const requestSpy = jest
      .spyOn(http as any, "request")
      .mockResolvedValue("get result");
    const result = await http.get("path");
    expect(requestSpy).toHaveBeenCalledWith("path", "GET", undefined);
    expect(result).toBe("get result");
  });

  it("post calls request with POST", async () => {
    const requestSpy = jest
      .spyOn(http as any, "request")
      .mockResolvedValue("post result");
    const result = await http.post("path");
    expect(requestSpy).toHaveBeenCalledWith("path", "POST", undefined);
    expect(result).toBe("post result");
  });

  it("put calls request with PUT", async () => {
    const requestSpy = jest
      .spyOn(http as any, "request")
      .mockResolvedValue("put result");
    const result = await http.put("path");
    expect(requestSpy).toHaveBeenCalledWith("path", "PUT", undefined);
    expect(result).toBe("put result");
  });

  it("delete calls request with DELETE", async () => {
    const requestSpy = jest
      .spyOn(http as any, "request")
      .mockResolvedValue("delete result");
    const result = await http.delete("path");
    expect(requestSpy).toHaveBeenCalledWith("path", "DELETE", undefined);
    expect(result).toBe("delete result");
  });

  it("should call revalidateTag with the correct tag", async () => {
    await http.invalidateCacheByTag("my-tag");
    expect(revalidateTag).toHaveBeenCalledWith("my-tag");
  });
});
