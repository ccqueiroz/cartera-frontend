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
    const params = {
      a: 1,
      b: "test",
      c: null,
      d: undefined,
    };
    await http.get("/path", { params });

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

  it("should build headers with Authorization when token exists", async () => {
    storageMock.recover.mockReturnValue("token123");
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
        }),
        body: undefined,
        cache: "force-cache",
      })
    );
  });

  it("should build headers without Authorization when no token", async () => {
    storageMock.recover.mockReturnValue(null);

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
          "Content-Type": "application/json",
        }),
        body: undefined,
        cache: "force-cache",
      })
    );
  });

  it("should call fetch with correct parameters for GET without body", async () => {
    storageMock.recover.mockReturnValue("token123");
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const result = await http.get("/path");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
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

    const methodMap = {
      POST: http.post.bind(http),
      PUT: http.put.bind(http),
      PATCH: http.patch.bind(http),
    } as const;

    for (const method of ["POST", "PUT", "PATCH"] as const) {
      const result = await methodMap[method](path, { body });

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

  it("should throw HttpError on non-ok response", async () => {
    storageMock.recover.mockReturnValue(null);
    const fakeResponse = {
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({ message: "Bad request" }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await expect(http.get(path)).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw HttpError with null message if json parsing fails", async () => {
    storageMock.recover.mockReturnValue(null);
    const fakeResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);

    await expect(http.get(path)).rejects.toBeInstanceOf(HttpError);
  });

  it("get calls request with GET", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 123 }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);
    const result = await http.get("path");

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

    expect(result).toEqual({ data: 123 });
  });

  it("post calls request with POST", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(null),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);
    const result = await http.post("path", { body: { id: 1 } });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id: 1 }),
        cache: "force-cache",
      })
    );

    expect(result).toBeNull();
  });

  it("put calls request with PUT", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: "ok",
      }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);
    const result = await http.put("path", {
      params: { id: 2 },
      body: { id: 1 },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path?id=2",
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id: 1 }),
        cache: "force-cache",
      })
    );

    expect(result).toEqual({ data: "ok" });
  });

  it("put calls request with PATCH", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: "ok",
      }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);
    const result = await http.patch("path", {
      params: { id: 2 },
      body: { id: 1 },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path?id=2",
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ id: 1 }),
        cache: "force-cache",
      })
    );

    expect(result).toEqual({ data: "ok" });
  });

  it("delete calls request with DELETE", async () => {
    const fakeResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(undefined),
    };
    (global.fetch as jest.Mock).mockResolvedValue(fakeResponse);
    const result = await http.delete<void>("path", {
      params: { id: 2 },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path?id=2",
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
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
