import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import {
  animalFixture,
  createAnimalFixture,
  inexistentAnimalId,
} from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { Animal } from "@/app/domain/animal/entity/animal";
import { UUID_REGEX } from "@/app/globals/constants";
import type { Pageable } from "@/app/types/pagination.types";
import type { FilterCriteria } from "@/app/types/filtering.types";
import type { AnimalLike } from "@/app/domain/animal/entity/animal.types";

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

  // 20 animals registered from here
  it("should find first 10 animals of 20 animals, 2 pages and current page is 1", async () => {
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

  it("should find first 5 animals of 20 animals, 4 pages and current page is 1", async () => {
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

  // 21 animals registered from here
  it("should find 1 of 21 animals, 3 pages and current page is 1", async () => {
    const filters: FilterCriteria<AnimalLike> = { name: "Xpto", age: 3 };

    const animal21 = Animal.with({
      ...animalFixture,
      name: "Xpto",
      age: 3,
      history: "History Xpto lorem ipsum",
      observations: "Observations Cat Lorem ipsum",
    });
    await animalRepository.save(animal21);

    const output = await animalRepository.findAll(undefined, filters);
    expect(output.items).toHaveLength(1);
    expect(output.totalItems).toBe(21);
    expect(output.totalPages).toBe(3);
    expect(output.currentPage).toBe(1);
  });

  it("should find 1 of 21 animals, 3 pages and current page is 1 with case-insensitive name", async () => {
    const filters: FilterCriteria<AnimalLike> = { name: "xpto" };

    const output = await animalRepository.findAll(undefined, filters);
    expect(output.items).toHaveLength(1);
    expect(output.totalItems).toBe(21);
    expect(output.totalPages).toBe(3);
    expect(output.currentPage).toBe(1);
  });

  it("should not find any filtered animals of 21 animals, 3 pages and current page is 0", async () => {
    const filters: FilterCriteria<AnimalLike> = { name: "None" };

    const output = await animalRepository.findAll(undefined, filters);
    expect(output.items).toHaveLength(0);
    expect(output.totalItems).toBe(21);
    expect(output.totalPages).toBe(3);
    expect(output.currentPage).toBe(0);
  });
});
