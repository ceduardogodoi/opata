import { describe, expect, it } from "vitest";
import { NoResourcesFoundError } from "./no-resources-found.error";

describe("http / errors / no resources error", () => {
  it("should create an no resources found error instance no extensions", () => {
    const error = new NoResourcesFoundError();
    error.setInstance = "/api/animals";

    expect(error).toBeInstanceOf(NoResourcesFoundError);
    expect(error.type).toBe("https://example.com/probs/no-resources-found");
    expect(error.title).toBe("No resources were found for your request.");
    expect(error.detail).toBe(
      "The request you made has not found any resources."
    );
    expect(error.instance).toBe("/api/animals");
  });
});
