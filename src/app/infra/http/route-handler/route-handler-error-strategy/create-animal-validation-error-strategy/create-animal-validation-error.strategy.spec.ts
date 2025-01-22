import { describe, expect, it } from "vitest";
import { UnknownError } from "../../../errors/unknown/unknown.error";
import { CreateAnimalValidationErrorStrategy } from "./create-animal-validation-error.strategy";
import { CreateAnimalValidationError } from "../../../errors/create-animal-validation/create-animal-validation.error";

describe("error handler strategies / create animal validation error strategy", () => {
  it("cannot handle error when it is not a valid instance", () => {
    const error = new UnknownError("/api/animals");
    const strategy = new CreateAnimalValidationErrorStrategy();

    expect(strategy.canHandle(error)).toBe(false);
  });

  it("should handle error when a valid instance is passed", async () => {
    const error = new CreateAnimalValidationError({
      name: ["Name is required."],
    });
    const strategy = new CreateAnimalValidationErrorStrategy();

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
