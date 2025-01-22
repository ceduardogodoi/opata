import { describe, expect, it } from "vitest";
import { DuplicateResourceError } from "./duplicate-resource";

describe("http / errors / duplicate resource error", () => {
  it("should create an no resources found error instance no extensions", () => {
    const error = new DuplicateResourceError("/api/users");

    expect(error).toBeInstanceOf(DuplicateResourceError);
    expect(error.id).toBe("DuplicateResourceError");
    expect(error.type).toBe("https://example.com/probs/duplicate-resource");
    expect(error.title).toBe("Resource already exists.");
    expect(error.detail).toBe("This resource was already registered.");
    expect(error.instance).toBe("/api/users");
  });
});
