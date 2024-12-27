import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EnvironmentVariables } from "./environment-variables";
import { EnvironmentVariablesError } from "./environment-variables.error";

describe("entities / environment-variables / invalid", () => {
  it("should have one singleton instance", () => {
    const instance = EnvironmentVariables.getInstance();
    const anotherInstance = EnvironmentVariables.getInstance();

    expect(instance).toBe(anotherInstance);
  });

  it("should throw when trying to instantiate using the 'new' keyword", () => {
    expect(() => new EnvironmentVariables()).toThrowError(
      "EnvironmentVariables is a singleton class. Use EnvironmentVariables.getInstance() instead."
    );
  });

  it("should return an error when the environment variables are invalid", () => {
    const instance = EnvironmentVariables.getInstance();
    const [error, data] = instance.validateEnv();

    expect(error).not.toBeNull();
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(EnvironmentVariablesError);
  });

  it("should only print to the console when in 'development' mode", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    vi.stubEnv("NODE_ENV", "development");

    const instance = EnvironmentVariables.getInstance();
    const [error] = instance.validateEnv();

    expect(error).not.toBeNull();
    expect(error).toBeInstanceOf(EnvironmentVariablesError);

    expect(consoleErrorSpy).toHaveBeenCalledOnce();

    vi.unstubAllEnvs();
  });
});

describe("entities / environment-variables / valid", () => {
  beforeEach(() => {
    vi.stubEnv("VERCEL_ORG_ID", "vercel_org_id");
    vi.stubEnv("VERCEL_PROJECT_ID", "vercel_project_id");
    vi.stubEnv("VERCEL_TOKEN", "vercel_token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return the data when the environment variables are valid", () => {
    const instance = EnvironmentVariables.getInstance();
    const [error, data] = instance.validateEnv();

    expect(error).toBeNull();
    expect(data).not.toBeNull();
  });
});
