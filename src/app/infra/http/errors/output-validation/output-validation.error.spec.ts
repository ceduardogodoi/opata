import { describe, expect, it } from "vitest";
import { OutputValidationError } from "./output-validation.error";

describe("http / errors / output validation", () => {
  it("should create an output validation error instance with extensions", () => {
    const error = new OutputValidationError("/api/animals");

    expect(error).toBeInstanceOf(OutputValidationError);
    expect(error.id).toBe("OutputValidationError");
    expect(error.type).toBe("https://example.com/probs/output-validation");
    expect(error.title).toBe(
      "Something went wrong while processing output data."
    );
    expect(error.detail).toBe(
      "The resource output is malformed or has invalid data."
    );
    expect(error.instance).toBe("/api/animals");
  });
});
