import { describe, expect, it } from "vitest";
import { UnknownError } from "../../../errors/unknown/unknown.error";
import { InputValidationErrorStrategy } from "./input-validation-error.strategy";
import { InputValidationError } from "../../../errors/input-validation/input-validation.error";

describe("error handler strategies / input validation error strategy", () => {
  it("cannot handle error when it is not a valid instance", () => {
    const error = new UnknownError("/api/animals");
    const strategy = new InputValidationErrorStrategy();

    expect(strategy.canHandle(error)).toBe(false);
  });

  it("should handle error when a valid instance is passed", async () => {
    const error = new InputValidationError({
      name: ["Name is required."],
    });
    const strategy = new InputValidationErrorStrategy();

    const response = strategy.handle(error, "/api/animals");
    const output = await response.json();

    expect(strategy.canHandle(error)).toBe(true);
    expect(response.status).toBe(400);
    expect(output).toEqual({
      type: "https://example.com/probs/input-validation",
      title: "You have entered invalid input data.",
      detail: "Input with invalid value for field(s): name",
      instance: "/api/animals",
      fields: {
        name: ["Name is required."],
      },
    });
  });
});
