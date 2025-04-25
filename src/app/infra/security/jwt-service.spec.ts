import { describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import { JwtService } from "./jwt-service";
import { env } from "@/app/env";
import { TimeConverter } from "@/utils/time.utils";

describe("security / jwt service", () => {
  vi.stubEnv("JWT_SECRET", "jwt_secret");

  const payload = {
    id: "3352e0eb-0592-4cca-8cba-358e22766a09",
    fullName: "Xpto Doe",
    username: "xpto",
    email: "xpto@email.com",
  };

  it("should throw when trying to sign with malformed payload", () => {
    const badPayload = {
      username: "xpto",
      email: "xpto@email.com",
    };

    expect(() => JwtService.sign(badPayload)).toThrowError(Error);
  });

  it("should sign a payload and return a token", () => {
    const token = JwtService.sign(payload);

    expect(token).toBeDefined();
    expect(token).toBeTypeOf("string");
  });

  it("should decode the token, and retrieve the payload", () => {
    const token = JwtService.sign(payload);
    const _payload = JwtService.decode(token);

    expect(_payload).toBeDefined();
    expect(_payload).toBeTypeOf("object");
    expect(_payload).toHaveProperty("username");
    expect(_payload).toHaveProperty("email");
  });

  it("should throw when verifying that the token is not valid", async () => {
    // TODO: create an http error to deal with this error
    // as problem detail request
    expect(() => JwtService.verify("invalid_token")).toThrowError(
      jwt.JsonWebTokenError
    );
  });

  it("should verify that the token is valid, and return the payload", async () => {
    const token = JwtService.sign(payload);
    const _payload = JwtService.verify(token);

    expect(_payload).toBeDefined();
    expect(_payload).toBeTypeOf("object");
    expect(_payload).toHaveProperty("username");
    expect(_payload).toHaveProperty("email");
  });

  it("should throw when decoded payload is missing data", () => {
    const badPayload = {
      username: "xpto",
      email: "xpto@email.com",
    };

    const token = jwt.sign(badPayload, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    expect(() => JwtService.decode(token)).toThrowError(Error);
  });

  it("should return false when token is not expired", () => {
    const token = JwtService.sign(payload);
    const isExpired = JwtService.isTokenExpired(token);

    expect(isExpired).toBe(false);
  });

  it("should return true when token is expired", () => {
    const token = JwtService.sign(payload);

    vi.useFakeTimers();

    // Advance time in one hour and one second
    const oneHourAndOneSecondInMilliseconds = new TimeConverter({
      hours: 1,
      seconds: 1,
    }).toMilliseconds();

    vi.advanceTimersByTime(oneHourAndOneSecondInMilliseconds);

    const isExpired = JwtService.isTokenExpired(token);

    expect(isExpired).toBe(true);

    vi.useRealTimers();
  });

  it("should return false when validating a token that is expired", () => {
    const token = JwtService.sign(payload);

    vi.useFakeTimers();

    // Advance time in one hour and one second
    const oneHourAndOneSecondInMilliseconds = new TimeConverter({
      hours: 1,
      seconds: 1,
    }).toMilliseconds();

    vi.advanceTimersByTime(oneHourAndOneSecondInMilliseconds);

    const isValid = JwtService.isTokenValid(token);

    expect(isValid).toBe(false);

    vi.useRealTimers();
  });

  it("should return false when trying to validate an invalid token", () => {
    const token = jwt.sign({}, env.JWT_SECRET, { expiresIn: "1h" });

    vi.useFakeTimers();

    // Advance time in one hour and one second
    const oneHourAndOneSecondInMilliseconds = new TimeConverter({
      hours: 1,
      seconds: 1,
    }).toMilliseconds();

    vi.advanceTimersByTime(oneHourAndOneSecondInMilliseconds);

    const isValid = JwtService.isTokenValid(token);

    expect(isValid).toBe(false);

    vi.useRealTimers();
  });

  it("should return true if token is validated and not expired", () => {
    const token = JwtService.sign(payload);
    const isValid = JwtService.isTokenValid(token);
    expect(isValid).toBe(true);
  });
});
