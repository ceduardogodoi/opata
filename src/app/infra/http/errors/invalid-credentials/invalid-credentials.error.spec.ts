import { describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "./invalid-credentials";

describe("http / errors / invalid username or password error", () => {
  it("should create an invalid username or password error instance no extensions", () => {
    const error = new InvalidCredentialsError("/api/users");

    expect(error).toBeInstanceOf(InvalidCredentialsError);
    expect(error.id).toBe("InvalidCredentialsError");
    expect(error.type).toBe("https://example.com/probs/invalid-credentials");
    expect(error.title).toBe("Username or password are invalid.");
    expect(error.detail).toBe(
      "You entered invalid credentials, please enter valid credentials."
    );
    expect(error.instance).toBe("/api/users");
  });
});
