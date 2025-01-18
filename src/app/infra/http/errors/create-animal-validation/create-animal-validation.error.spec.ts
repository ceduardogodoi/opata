import { describe, expect, it } from "vitest";
import { CreateAnimalValidationError } from "./create-animal-validation.error";

describe("use-cases / errors / create animal", () => {
  it("should create an error instance with extensions", () => {
    const fields = {
      name: ["Name is required."],
    };

    const error = new CreateAnimalValidationError(fields);

    expect(error).toBeInstanceOf(CreateAnimalValidationError);
    expect(error.type).toBe("https://example.com/probs/input-validation");
    expect(error.title).toBe("You have entered invalid input data.");
    expect(error.detail).toBe("Input with invalid value for field(s): name");
    expect(error.instance).toBe("/api/animals");
    expect(error.fields).toHaveProperty("name", ["Name is required."]);
  });

  it("should present the correct fields and messages as they are passed", () => {
    const fieldErrors = {
      fieldA: ["fieldA is required."],
      fieldB: ["fieldB is too short."],
    };

    const error = new CreateAnimalValidationError(fieldErrors);

    expect(error).toBeInstanceOf(CreateAnimalValidationError);
    expect(error.type).toBe("https://example.com/probs/input-validation");
    expect(error.title).toBe("You have entered invalid input data.");
    expect(error.detail).toBe(
      "Input with invalid value for field(s): fieldA, fieldB"
    );
    expect(error.instance).toBe("/api/animals");
    expect(error.fields).toHaveProperty("fieldA", ["fieldA is required."]);
    expect(error.fields).toHaveProperty("fieldB", ["fieldB is too short."]);
  });

  it("should throw when no fieldErrors are passed", () => {
    const fields = {};

    expect(() => new CreateAnimalValidationError(fields)).toThrowError(
      new RangeError("No field errors present.")
    );
  });
});
