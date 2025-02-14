import { describe, it, expect } from "vitest";
import { EnvironmentVariablesError } from "./environment-variables.error";

describe("entities / environment variables error", () => {
  it("should create an EnvironmentVariablesError instance", () => {
    const instance = new EnvironmentVariablesError({
      field: ["Error description"],
    });
    expect(instance).toHaveProperty("name", "EnvironmentVariablesError");
    expect(instance).toBeInstanceOf(EnvironmentVariablesError);
  });

  it("should throw EnvironmentVariablesError with correct error message", () => {
    const fieldErrors = { field: ["Error description"] };

    const variables = Object.keys(fieldErrors).join(", ");

    expect(() => {
      throw new EnvironmentVariablesError({ field: ["Error description"] });
    }).toThrowError(
      `test - One or more environment variables were not set correctly: ${variables}`
    );
  });
});
