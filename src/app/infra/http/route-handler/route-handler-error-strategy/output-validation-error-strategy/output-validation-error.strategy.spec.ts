import { describe, expect, it } from "vitest";
import { UnknownError } from "../../../errors/unknown/unknown.error";
import { OutputValidationErrorStrategy } from "./output-validation-error.strategy";
import { OutputValidationError } from "../../../errors/output-validation/output-validation.error";

describe("error handler strategies / output validation error strategy", () => {
  it("cannot handle error when it is not a valid instance", () => {
    const error = new UnknownError("/api/animals");
    const strategy = new OutputValidationErrorStrategy();

    expect(strategy.canHandle(error)).toBe(false);
  });

  it("should handle error when a valid output validation error instance is passed", async () => {
    const error = new OutputValidationError();
    const strategy = new OutputValidationErrorStrategy();

    const response = strategy.handle(error, "/api/animals");
    const output = await response.json();

    expect(strategy.canHandle(error)).toBe(true);
    expect(response.status).toBe(400);
    expect(output).toEqual({
      type: "https://example.com/probs/output-validation",
      title: "Something went wrong while processing output data.",
      detail: "The resource output is malformed or has invalid data.",
      instance: "/api/animals",
    });
  });
});
