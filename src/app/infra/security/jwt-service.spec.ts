import { describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import { JwtService } from "./jwt-service";

describe("security / jwt service", () => {
  vi.stubEnv("JWT_SECRET", "jwt_secret");

  const payload = {
    id: "3352e0eb-0592-4cca-8cba-358e22766a09",
    username: "xpto",
    email: "xpto@email.com",
  };

  let token: string;

  it("should sign a payload and return a token", () => {
    token = JwtService.sign(payload);

    expect(token).toBeDefined();
    expect(token).toBeTypeOf("string");
  });

  it("should decode the token, and retrieve the payload", () => {
    const payload = JwtService.decode(token);

    expect(payload).toBeDefined();
    expect(payload).toBeTypeOf("object");
    expect(payload).toHaveProperty("id");
    expect(payload).toHaveProperty("username");
    expect(payload).toHaveProperty("email");
  });

  it("should throw when decoded payload is missing data", () => {
    const badPayload = {
      username: "xpto",
      email: "xpto@email.com",
    };

    const token = JwtService.sign(badPayload);

    expect(() => JwtService.decode(token)).toThrowError("Invalid output.");
  });

  it.each([
    { payload: null, message: "is not present" },
    { payload: "str", message: "is a string" },
  ])("should throw when decoded payload $message", ({ payload }) => {
    const token = JwtService.sign({});

    vi.spyOn(jwt, "decode").mockReturnValueOnce(payload);

    expect(() => JwtService.decode(token)).toThrowError(
      "Error trying to decode the token."
    );
  });
});
