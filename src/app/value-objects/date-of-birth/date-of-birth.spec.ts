import { describe, expect, it, vi } from "vitest";
import { DateOfBirth } from "./date-of-birth";

describe("value objects / date-of-birth", () => {
  it("should be able to create a date of birth", () => {
    const date = new Date("2025-01-01T00:00:00.000Z");

    const dob = new DateOfBirth(date);
    expect(dob.value).toBe(date);
  });

  it("should not be able to create a date of birth with a date in the future", () => {
    vi.useFakeTimers();

    // Set the system time to January 1st, 2025
    vi.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));

    // Create a date in the future (December 31st, 2025)
    const dateInTheFuture = new Date("2025-12-31T00:00:00.000Z");

    expect(() => new DateOfBirth(dateInTheFuture)).toThrowError(
      "Data de nascimento não pode ser uma data no futuro."
    );

    vi.useRealTimers();
  });

  it("should be able to calculate the age of an animal", () => {
    vi.useFakeTimers();

    // Set the system time to January 1st, 2025
    vi.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));
    
    // Create a birth date in 2023
    const birthDate = new Date("2023-01-01T00:00:00.000Z");

    const dateOfBirth = new DateOfBirth(birthDate);
    expect(dateOfBirth.age).toBe(2);

    vi.useRealTimers();
  });
});
