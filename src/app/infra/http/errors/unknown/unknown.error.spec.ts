import { describe, expect, it } from "vitest";
import { UnknownError } from "./unknown.error";

describe("http / errors / unknown error", () => {
  it("should create an unknown error instance no extensions", () => {
    const error = new UnknownError("/api/animals");

    expect(error).toBeInstanceOf(UnknownError);
    expect(error.type).toBe("https://example.com/probs/unknown");
    expect(error.title).toBe("An unknown error has occured.");
    expect(error.detail).toBe(
      "An unknown error has occured in our servers. Please try again later."
    );
    expect(error.instance).toBe("/api/animals");
  });
});
