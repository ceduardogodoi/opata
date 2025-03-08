import { describe, expect, it } from "vitest";
import { InvalidCredentialsErrorStrategy } from "./invalid-credentials-error.strategy";
import { UnknownError } from "../../../errors/unknown/unknown.error";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials/invalid-credentials";

describe("error handler strategies / invalid credentials error strategy", () => {
  it("cannot handle error when it is not a valid instance", () => {
    const error = new UnknownError("/api/users");
    const strategy = new InvalidCredentialsErrorStrategy();

    expect(strategy.canHandle(error)).toBe(false);
  });

  it("should handle error when a valid instance is passed", async () => {
    const error = new InvalidCredentialsError();
    const strategy = new InvalidCredentialsErrorStrategy();

    const response = strategy.handle(error, "/api/users");
    const output = await response.json();

    expect(strategy.canHandle(error)).toBe(true);
    expect(response.status).toBe(401);
    expect(output).toEqual({
      type: "https://example.com/probs/invalid-credentials",
      title: "Username or password are invalid.",
      detail:
        "You entered invalid credentials, please enter valid credentials.",
      instance: "/api/users",
    });
  });
});
