import { describe, expect, it, vi } from "vitest";
import { Animal } from "./animal";
import {
  animalFixture,
  createAnimalFixture,
} from "@/app/fixtures/animal.fixtures";
import { UUID_REGEX } from "@/app/globals/constants";
import { DateOfBirth } from "@/app/value-objects/date-of-birth/date-of-birth";

describe("entities / animal", () => {
  it("should create a new animal", () => {
    const mockSystemDate = new Date("2025-01-01T00:00:00.000Z");
    vi.setSystemTime(mockSystemDate);

    const animal = Animal.create(createAnimalFixture);

    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toMatch(UUID_REGEX);
    expect(animal.name).toBe("Dog");
    expect(animal.isAdopted).toBe(false);
    expect(animal.createdAt).toEqual(mockSystemDate);
    expect(animal.updatedAt).toEqual(mockSystemDate);
    expect(animal.age).toBe(2);
    expect(animal.history).toBe("History Dog lorem ipsum");
    expect(animal.observations).toBe("Observations Dog Lorem ipsum");

    vi.useRealTimers();
  });

  it("should create an animal with predefined data", () => {
    const mockSystemDate = new Date("2025-01-01T00:00:00.000Z");
    vi.setSystemTime(mockSystemDate);

    const animal = Animal.with(animalFixture);

    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toBe("bf38b884-0e4d-4443-9be2-47cc2bf26fe5");
    expect(animal.name).toBe("Cat");
    expect(animal.isAdopted).toBe(false);
    expect(animal.createdAt).toEqual(mockSystemDate);
    expect(animal.updatedAt).toEqual(mockSystemDate);
    expect(animal.age).toBe(2);
    expect(animal.history).toBe("History Cat lorem ipsum");
    expect(animal.observations).toBe("Observations Cat Lorem ipsum");
  });

  it("should return serialized animal", () => {
    const animal = Animal.with(animalFixture);
    const json = animal.toJSON();

    const dateOfBirth = new DateOfBirth(new Date("2023-01-01T00:00:00.000Z"));

    expect(json).not.toBeInstanceOf(Animal);
    expect(json.id).toBe("bf38b884-0e4d-4443-9be2-47cc2bf26fe5");
    expect(json.name).toBe("Cat");
    expect(json.isAdopted).toBe(false);
    expect(json.createdAt).toEqual(new Date("2025-01-01T00:00:00.000Z"));
    expect(json.updatedAt).toEqual(new Date("2025-01-01T00:00:00.000Z"));
    expect(json.dateOfBirth).toEqual(dateOfBirth);
    expect(json.age).toBe(2);
    expect(json.history).toBe("History Cat lorem ipsum");
  });
});
