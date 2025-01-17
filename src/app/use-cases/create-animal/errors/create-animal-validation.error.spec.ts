import { describe, expect, it } from "vitest";
import { CreateAnimalValidationError } from "./create-animal-validation.error";

describe("use-cases / errors / create animal", () => {
  it("should create an error instance with extensions", () => {
    const error = new CreateAnimalValidationError(
      "Your input is missing valid value(s) for field(s): name",
      {
        name: ["Name is required."],
      }
    );

    expect(error).toBeInstanceOf(CreateAnimalValidationError);
    expect(error.type).toBe("https://example.com/probs/input-validation");
    expect(error.title).toBe("You have entered invalid input data.");
    expect(error.detail).toBe(
      "Your input is missing valid value(s) for field(s): name"
    );
    expect(error.instance).toBe("/api/animals");
    expect(error.fields).toHaveProperty("name", ["Name is required."]);
  });

  it("should present the correct fields and messages as they are passed", () => {
    const fieldErrors = {
      fieldA: ["fieldA is required."],
      fieldB: ["fieldB is too short."],
    };
    const fields = Object.keys(fieldErrors).join(" ,");

    const error = new CreateAnimalValidationError(
      `Your input is missing valid value(s) for field(s): ${fields}`,
      fieldErrors
    );

    expect(error).toBeInstanceOf(CreateAnimalValidationError);
    expect(error.type).toBe("https://example.com/probs/input-validation");
    expect(error.title).toBe("You have entered invalid input data.");
    expect(error.detail).toBe(
      `Your input is missing valid value(s) for field(s): ${fields}`
    );
    expect(error.instance).toBe("/api/animals");
    expect(error.fields).toHaveProperty("fieldA", ["fieldA is required."]);
    expect(error.fields).toHaveProperty("fieldB", ["fieldB is too short."]);
  });

  it("should throw when no fields are passed", () => {
    const fields = {};

    expect(
      () => new CreateAnimalValidationError("_detail_", fields)
    ).toThrowError(new RangeError("No field errors present."));
  });
});
