import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { container } from "tsyringe";
import { CreateAnimalUseCase } from "./create-animal.usecase";
import { createAnimalFixture } from "@/app/fixtures/animal.fixtures";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { UUID_REGEX } from "@/app/globals/constants";
import { Animal } from "@/app/domain/animal/entity/animal";

describe("use-cases / create animal", () => {
  let animalRepository: AnimalRepositoryGateway;

  const mockSystemDate = new Date("2025-01-01T00:00:00.000Z");

  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");

    vi.setSystemTime(mockSystemDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should create an animal and confirm its data", async () => {
    const createAnimalUsecase = CreateAnimalUseCase.create(animalRepository);

    const animal = await createAnimalUsecase.execute(createAnimalFixture);
    expect(animal).toBeInstanceOf(Animal);
    expect(animal.id).toMatch(UUID_REGEX);
    expect(animal.name).toBe("Dog");
    expect(animal.isAdopted).toBe(false);
    expect(animal.createdAt).toEqual(mockSystemDate);
    expect(animal.updatedAt).toEqual(mockSystemDate);
    expect(animal.dateOfBirth).toEqual(new Date("2023-01-01T00:00:00.000Z"));
    expect(animal.age).toBe(2);
    expect(animal.history).toBe("History Dog lorem ipsum");
    expect(animal.observations).toBe("Observations Dog Lorem ipsum");
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
      detail: "Input with invalid value for field(s): name",
      fields: {
        name: ["Name is required."],
      },
    });
  });
});
