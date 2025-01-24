import { describe, expect, it } from "vitest";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { container } from "tsyringe";
import { FindAllAnimalsUseCase } from "./find-all-animals.usecase";
import { Animal } from "@/app/domain/animal/entity/animal";
import { createAnimalFixture } from "@/app/fixtures/animal.fixtures";

describe("use-cases / find all animals", () => {
  const animalRepository = container.resolve<AnimalRepositoryGateway>(
    "AnimalRepositoryGateway"
  );

  it("should return no animals, but pagination metadata", async () => {
    const findAllAnimalsUseCase =
      FindAllAnimalsUseCase.create(animalRepository);

    const output = await findAllAnimalsUseCase.execute();
    expect(output.items).toHaveLength(0);
    expect(output.totalPageItems).toBe(0);
    expect(output.totalItems).toBe(0);
    expect(output.totalPages).toBe(0);
    expect(output.currentPage).toBe(0);
  });

  it("should return all 3 registered animals", async () => {
    Array.from({ length: 3 }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalRepository.save(animal);
    });

    const findAllAnimalsUseCase =
      FindAllAnimalsUseCase.create(animalRepository);

    const output = await findAllAnimalsUseCase.execute();
    expect(output.items).toHaveLength(3);
    expect(output.totalPageItems).toBe(3);
    expect(output.totalItems).toBe(3);
    expect(output.totalPages).toBe(1);
    expect(output.currentPage).toBe(1);
  });
});
