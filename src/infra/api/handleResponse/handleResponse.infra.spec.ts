import { HttpError } from "@/domain/http/http.erro.entitie";
import { HandleResponseInfra } from "./handleResponse.infra";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";

describe("HandleResponseInfra", () => {
  let handleResponse: HandleResponseInfra;

  beforeEach(() => {
    handleResponse = new HandleResponseInfra();
  });

  it("should return success true with data when the function resolves", async () => {
    const result = await handleResponse.execute(() => Promise.resolve("data"));

    expect(result).toEqual({
      success: true,
      data: "data",
    });
  });

  it("should return success false with HttpError message when HttpError is thrown", async () => {
    const error = new HttpError(404, "Not Found");

    const result = await handleResponse.execute(() => {
      throw error;
    });

    expect(result).toEqual({
      success: false,
      error: "Not Found",
    });
  });

  it("should return success false with Error message when generic Error is thrown", async () => {
    const error = new Error("Generic Error");

    const result = await handleResponse.execute(() => {
      throw error;
    });

    expect(result).toEqual({
      success: false,
      error: "Generic Error",
    });
  });

  it("should return success false with UNKNOWN_ERROR when a non-error is thrown (string)", async () => {
    const result = await handleResponse.execute(() => {
      throw "String error";
    });

    expect(result).toEqual({
      success: false,
      error: DomainMessageList.UNKNOWN_ERROR,
    });
  });

  it("should return success false with UNKNOWN_ERROR when a non-error is thrown (number)", async () => {
    const result = await handleResponse.execute(() => {
      throw 12345;
    });

    expect(result).toEqual({
      success: false,
      error: DomainMessageList.UNKNOWN_ERROR,
    });
  });

  it("should return success false with UNKNOWN_ERROR when a non-error is thrown (null)", async () => {
    const result = await handleResponse.execute(() => {
      throw null;
    });

    expect(result).toEqual({
      success: false,
      error: DomainMessageList.UNKNOWN_ERROR,
    });
  });

  it("should return success false with UNKNOWN_ERROR when a non-error is thrown (undefined)", async () => {
    const result = await handleResponse.execute(() => {
      throw undefined;
    });

    expect(result).toEqual({
      success: false,
      error: DomainMessageList.UNKNOWN_ERROR,
    });
  });

  it("should handle async function rejection", async () => {
    const result = await handleResponse.execute(() =>
      Promise.reject(new Error("Rejected Error"))
    );

    expect(result).toEqual({
      success: false,
      error: "Rejected Error",
    });
  });

  it("should handle async function rejection with HttpError", async () => {
    const result = await handleResponse.execute(() =>
      Promise.reject(new HttpError(500, "Server Error"))
    );

    expect(result).toEqual({
      success: false,
      error: "Server Error",
    });
  });
});
