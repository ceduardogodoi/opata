import { describe, expect, it } from "vitest";
import { UnknownError } from "../../../errors/unknown/unknown.error";
import { NoResourcesFoundErrorStrategy } from "./no-resources-found-error.strategy";
import { NoResourcesFoundError } from "../../../errors/no-resources-found/no-resources-found.error";

describe("error handler strategies / no resources found error strategy", () => {
  it("cannot handle error when it is not a valid instance", () => {
    const error = new UnknownError("/api/animals");
    const strategy = new NoResourcesFoundErrorStrategy();

    expect(strategy.canHandle(error)).toBe(false);
  });

  it("should handle error when a valid instance is passed", async () => {
    const error = new NoResourcesFoundError();
    const strategy = new NoResourcesFoundErrorStrategy();

    const response = strategy.handle(error, "/api/animals");
    const output = await response.json();

    expect(strategy.canHandle(error)).toBe(true);
    expect(response.status).toBe(404);
    expect(output).toEqual({
      type: "https://example.com/probs/no-resources-found",
      title: "No resources were found for your request.",
      detail: "The request you made has not found any resources.",
      instance: "/api/animals",
    });
  });
});
