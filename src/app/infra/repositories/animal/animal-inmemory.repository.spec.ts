import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import {
  createAnimalFixture,
  inexistentAnimalId,
} from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { Animal } from "@/app/domain/animal/entity/animal";
import { uuidRegex } from "@/app/utils/constants";

describe("repositories / animal", () => {
  let animalRepository: AnimalRepositoryGateway;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");
  });

  it("should save an animal", async () => {
    const animal1 = Animal.create(createAnimalFixture);
    const animalSaved = await animalRepository.save(animal1);
    expect(animalSaved.id).toMatch(uuidRegex);
  });

  it("should get null when find by inexistent id", async () => {
    const animalNotFound = await animalRepository.findById(inexistentAnimalId);
    expect(animalNotFound).toBeNull();
  });

  it("should get an animal by its id", async () => {
    const animal2 = Animal.create(createAnimalFixture);
    await animalRepository.save(animal2);

    const animalFound = await animalRepository.findById(animal2.id);
    expect(animalFound).not.toBeNull();
    expect(animalFound?.id).toBe(animal2.id);
  });

  it("should find all animals", async () => {
    const animal3 = Animal.create(createAnimalFixture);
    await animalRepository.save(animal3);

    const animals = await animalRepository.findAll();
    expect(animals).toHaveLength(3);
  });
});
