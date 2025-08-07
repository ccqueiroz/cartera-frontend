import { ParseCookiesHelper } from "./parseCookies.infra";

describe("ParseCookiesHelper", () => {
  const helper = new ParseCookiesHelper();

  it("should parse a single cookie correctly", () => {
    const cookies = ["session=abc123"];

    const result = helper.execute(cookies);

    expect(result).toEqual({
      session: "abc123",
    });
  });

  it("should parse multiple cookies in one string", () => {
    const cookies = ["session=abc123; path=/; HttpOnly"];

    const result = helper.execute(cookies);

    expect(result).toEqual({
      session: "abc123",
      path: "/",
      HttpOnly: "",
    });
  });

  it("should parse multiple cookie strings", () => {
    const cookies = [
      "session=abc123; path=/",
      "token=xyz789; Secure",
      "flag=on",
    ];

    const result = helper.execute(cookies);

    expect(result).toEqual({
      session: "abc123",
      path: "/",
      token: "xyz789",
      Secure: "",
      flag: "on",
    });
  });

  it("should handle cookies with = in the value", () => {
    const cookies = ["token=abc=123=xyz; path=/"];

    const result = helper.execute(cookies);

    expect(result).toEqual({
      token: "abc=123=xyz",
      path: "/",
    });
  });

  it("should return an empty object when given an empty array", () => {
    const result = helper.execute([]);

    expect(result).toEqual({});
  });

  it("should override duplicate keys with the last occurrence", () => {
    const cookies = ["session=first; path=/", "session=second; Secure"];

    const result = helper.execute(cookies);

    expect(result).toEqual({
      session: "second",
      path: "/",
      Secure: "",
    });
  });

  it("should handle malformed cookie strings gracefully", () => {
    const cookies = ["malformedcookie", "keyonly=; another=val"];

    const result = helper.execute(cookies);

    expect(result).toEqual({
      malformedcookie: "",
      keyonly: "",
      another: "val",
    });
  });
});
