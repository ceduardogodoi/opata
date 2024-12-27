import { describe, it, expect } from "vitest";
import { EnvironmentVariablesError } from "./environment-variables.error";

describe("entities / environment variables error", () => {
  it("should create an EnvironmentVariablesError instance", () => {
    const instance = new EnvironmentVariablesError();
    expect(instance.name).toBe("EnvironmentVariablesError");
    expect(instance).toBeInstanceOf(EnvironmentVariablesError);
  });

  it("should throw EnvironmentVariablesError with correct error message", () => {
    expect(() => {
      throw new EnvironmentVariablesError();
    }).toThrowError(
      "One or more environment variables were not set correctly."
    );
  });
});
