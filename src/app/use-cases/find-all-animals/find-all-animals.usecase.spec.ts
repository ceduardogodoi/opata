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

  it("should return all registered animals", async () => {
    const findAllAnimalsUseCase =
      FindAllAnimalsUseCase.create(animalRepository);

    const animals = await findAllAnimalsUseCase.execute();
    expect(animals).toHaveLength(3);
  });
});
