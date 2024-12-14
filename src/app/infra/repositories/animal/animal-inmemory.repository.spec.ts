import { beforeEach, describe, expect, it } from "vitest";
import {
  createAnimalFixture,
  inexistentAnimalId,
} from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway";
import { AnimalInMemoryRepository } from "./animal-inmemory.repository";
import { Animal } from "@/app/domain/animal/entity/animal";
import { uuidRegex } from "@/app/utils/constants";

describe("repositories / animal", () => {
  let animalRepository: AnimalRepositoryGateway;
  beforeEach(() => {
    animalRepository = AnimalInMemoryRepository.create();
  });

  it("should save an animal", async () => {
    const animal = Animal.create(createAnimalFixture);
    const animalSaved = await animalRepository.save(animal);
    expect(animalSaved.id).toMatch(uuidRegex);
  });

  let animal1: Animal;
  let animal2: Animal;
  beforeEach(async () => {
    animal1 = Animal.create(createAnimalFixture);
    await animalRepository.save(animal1);

    animal2 = Animal.create(createAnimalFixture);
    await animalRepository.save(animal2);
  });

  it("should get null when find by inexistent id", async () => {
    const animalFound = await animalRepository.findById(inexistentAnimalId);
    expect(animalFound).toBeNull();
  });

  it("should get an animal by its id", async () => {
    const animalFound = await animalRepository.findById(animal2.id);
    expect(animalFound).not.toBeNull();
    expect(animalFound?.id).toBe(animal2.id);
  });

  it("should find all animals", async () => {
    const animals = await animalRepository.findAll();
    expect(animals).toHaveLength(2);
  });
});
