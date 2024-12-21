import { describe, it, expect, beforeEach } from "vitest";
import { container } from "tsyringe";
import { CreateAnimalUseCase } from "./create-animal.usecase";
import { createAnimalFixture } from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.types";
import { uuidRegex } from "@/app/utils/constants";

describe("use-cases / create-animal", () => {
  let animalRepository: AnimalRepositoryGateway;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");
  });

  it("should create an animal and confirm present its data", async () => {
    const createAnimalUsecase = CreateAnimalUseCase.create(animalRepository);

    const animal = await createAnimalUsecase.execute(createAnimalFixture);
    expect(animal.id).toMatch(uuidRegex);
  });
});
