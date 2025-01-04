import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import {
  createAnimalFixture,
  inexistentAnimalId,
} from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { Animal } from "@/app/domain/animal/entity/animal";
import { UUID_REGEX } from "@/app/globals/constants";
import type { Pageable } from "@/app/types/pagination.types";

describe("repositories / animal", () => {
  let animalRepository: AnimalRepositoryGateway;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");
  });

  it("should save an animal", async () => {
    const animal1 = Animal.create(createAnimalFixture);
    const animalSaved = await animalRepository.save(animal1);
    expect(animalSaved.id).toMatch(UUID_REGEX);
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

  it("should find all animals with page properties", async () => {
    const animal3 = Animal.create(createAnimalFixture);
    await animalRepository.save(animal3);

    const output = await animalRepository.findAll();
    expect(output.items).toHaveLength(3);
    expect(output.totalItems).toBe(3);
    expect(output.totalPages).toBe(1);
    expect(output.currentPage).toBe(1);
  });

  it("should find first 10 animals from the total of 20 animals, 2 pages and current page is 1", async () => {
    Array.from({ length: 17 }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalRepository.save(animal);
    });

    const output = await animalRepository.findAll();
    expect(output.items).toHaveLength(10);
    expect(output.totalItems).toBe(20);
    expect(output.totalPages).toBe(2);
    expect(output.currentPage).toBe(1);
  });

  it("should find first 5 animals from the total of 20 animals, 4 pages and current page is 1", async () => {
    const pageable: Pageable = {
      page: 1,
      pageSize: 5,
    };

    const output = await animalRepository.findAll(pageable);
    expect(output.items).toHaveLength(5);
    expect(output.totalItems).toBe(20);
    expect(output.totalPages).toBe(4);
    expect(output.currentPage).toBe(1);
  });
});
