import { beforeEach, describe, expect, it } from "vitest";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { container } from "tsyringe";
import { FindAllAnimalsUseCase } from "./find-all-animals.usecase";
import { Animal } from "@/app/domain/animal/entity/animal";
import { createAnimalFixture } from "@/app/fixtures/animal.fixtures";

describe("use-cases / find all animals", () => {
  let animalRepository: AnimalRepositoryGateway;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");

    Array.from({ length: 3 }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalRepository.save(animal);
    });
  });

  it("should return all 3 registered animals", async () => {
    const findAllAnimalsUseCase =
      FindAllAnimalsUseCase.create(animalRepository);

    const output = await findAllAnimalsUseCase.execute();
    expect(output.totalPageItems).toBe(3);
    expect(output.totalItems).toBe(3);
    expect(output.totalPages).toBe(1);
    expect(output.currentPage).toBe(1);
  });
});
