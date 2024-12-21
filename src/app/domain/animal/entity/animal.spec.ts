import { describe, expect, it, vi } from "vitest";
import { Animal } from "./animal";
import {
  animalFixture,
  createAnimalFixture,
} from "@/app/fixtures/animal.fixtures";
import { uuidRegex } from "@/app/utils/constants";

describe("entities / animal", () => {
  it("should create a new animal", () => {
    const mockDate = new Date(2024, 11, 21, 0, 0, 0, 0);
    vi.setSystemTime(mockDate);

    const animal = Animal.create(createAnimalFixture);

    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toMatch(uuidRegex);
    expect(animal.name).toBe(createAnimalFixture.name);
    expect(animal.isAdopted).toBe(false);
    expect(animal.createdAt).toEqual(mockDate);
    expect(animal.updatedAt).toEqual(mockDate);
    expect(animal.age).toBe(createAnimalFixture.age);
    expect(animal.history).toBe(createAnimalFixture.history);
    expect(animal.observations).toBe(createAnimalFixture.observations);

    vi.useRealTimers();
  });

  it("should create an animal with predefined data", () => {
    const animal = Animal.with(animalFixture);

    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toBe(animalFixture.id);
  });

  it("should return serialized animal", () => {
    const animal = Animal.with(animalFixture);
    const json = animal.toJSON();

    expect(json).not.toBeInstanceOf(Animal);
    expect(json.id).toBe(animalFixture.id);
  });
});
