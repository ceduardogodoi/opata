import { describe, expect, it } from "vitest";
import { DuplicateResourceError } from "../../../errors/duplicate-resource/duplicate-resource.error";
import { DuplicateResourceErrorStrategy } from "./duplicate-resources-error-strategy";
import { UnknownError } from "../../../errors/unknown/unknown.error";

describe("error handler strategies / no resources found error strategy", () => {
  it("cannot handle error when it is not a valid instance", () => {
    const error = new UnknownError("/api/animals");
    const strategy = new DuplicateResourceErrorStrategy();

    expect(strategy.canHandle(error)).toBe(false);
  });

  it("should handle error when a valid instance is passed", async () => {
    const error = new DuplicateResourceError();
    const strategy = new DuplicateResourceErrorStrategy();

    const response = strategy.handle(error, "/api/animals");
    const output = await response.json();

    expect(strategy.canHandle(error)).toBe(true);
    expect(response.status).toBe(409);
    expect(output).toEqual({
      type: "https://example.com/probs/duplicate-resource",
      title: "Resource already exists.",
      detail: "This resource was already registered.",
      instance: "/api/animals",
    });
  });
});
