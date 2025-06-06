import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DateOfBirth } from "./date-of-birth";

describe("value objects / date-of-birth", () => {
  const mockSystemDate = "2025-01-01T00:00:00.000Z";

  beforeEach(() => {
    vi.useFakeTimers();
    // Set the system time to January 1st, 2025
    vi.setSystemTime(mockSystemDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a date of birth", () => {
    const dob = new DateOfBirth("2025-01-01T00:00:00.000Z");

    expect(dob.value).toEqual(new Date("2025-01-01T00:00:00.000Z"));
  });

  it("should not be able to create a date of birth with an invalid date", () => {
    expect(() => new DateOfBirth("invalid")).toThrowError(
      "Data de nascimento inválida."
    );
  });

  it("should not be able to create a date of birth with a date in the future", () => {
    expect(() => new DateOfBirth("2025-12-31T00:00:00.000Z")).toThrowError(
      "Data de nascimento não pode ser uma data no futuro."
    );
  });

  it("should be able to calculate the age of an animal", () => {
    const dateOfBirth = new DateOfBirth("2023-01-01T00:00:00.000Z");
    expect(dateOfBirth.age).toBe(2);
  });
});
