import { describe, it, expect, beforeEach, vi } from "vitest";
import { container } from "tsyringe";
import { CreateAnimalUseCase } from "./create-animal.usecase";
import { createAnimalFixture } from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { UUID_REGEX } from "@/app/globals/constants";
import { Animal } from "@/app/domain/animal/entity/animal";

describe("use-cases / create animal", () => {
  let animalRepository: AnimalRepositoryGateway;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");
  });

  it("should create an animal and confirm its data", async () => {
    const mockDate = new Date(2024, 11, 28, 0, 0, 0, 0);
    vi.setSystemTime(mockDate);

    const createAnimalUsecase = CreateAnimalUseCase.create(animalRepository);

    const animal = await createAnimalUsecase.execute(createAnimalFixture);
    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toMatch(UUID_REGEX);
    expect(animal.name).toBe(createAnimalFixture.name);
    expect(animal.isAdopted).toBe(false);
    expect(animal.createdAt).toEqual(mockDate);
    expect(animal.updatedAt).toEqual(mockDate);
    expect(animal.age).toBe(createAnimalFixture.age);
    expect(animal.history).toBe(createAnimalFixture.history);
    expect(animal.observations).toBe(createAnimalFixture.observations);

    vi.useRealTimers();
  });

  it("should throw when trying to create an animal with invalid data", async () => {
    const createAnimalUsecase = CreateAnimalUseCase.create(animalRepository);

    const fixture = Object.create(createAnimalFixture, {
      name: {
        value: undefined,
      },
    });

    await expect(() =>
      createAnimalUsecase.execute(fixture)
    ).rejects.toMatchObject({
      detail: "Your input is missing valid value(s) for field(s): name",
      fields: {
        name: ["Name is required."],
      },
    });
  });
});
