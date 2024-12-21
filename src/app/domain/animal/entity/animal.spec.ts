import { describe, expect, it } from "vitest";
import { Animal } from "./animal";
import {
  animalFixture,
  createAnimalFixture,
} from "@/app/fixtures/animal.fixtures";
import { uuidRegex } from "@/app/utils/constants";

describe("entities / animal", () => {
  it("should create a new animal", () => {
    const animal = Animal.create(createAnimalFixture);

    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toMatch(uuidRegex);
    expect(false).toBe(true);
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
