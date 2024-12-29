import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
import { FindAllAnimalsPresentOutput } from "../../presenters/find-all-animals/find-all-animals.presenter.dto";
import { FindAllAnimalsRoute } from "./find-all-animals.route";
import { animalInstanceFixture } from "@/app/fixtures/animal.fixtures";

describe("routes / find all animals", () => {
  let animalRepository: AnimalRepositoryGateway;
  let findAllAnimalsUseCase: FindAllAnimalsUseCase;
  let findAllAnimalsRoute: FindAllAnimalsRoute;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");
    findAllAnimalsUseCase = FindAllAnimalsUseCase.create(animalRepository);
    findAllAnimalsRoute = FindAllAnimalsRoute.create(findAllAnimalsUseCase);
  });

  it("should return 404 when there are no registered animals", async () => {
    const response = await findAllAnimalsRoute.handle();
    const output: FindAllAnimalsPresentOutput = await response.json();
    expect(response.status).toBe(404);
    expect(output).toHaveLength(0);
  });

  it("should return 200 with all registered animals", async () => {
    Array.from({ length: 3 }).forEach(async () => {
      await animalRepository.save(animalInstanceFixture);
    });

    const response = await findAllAnimalsRoute.handle();
    const output: FindAllAnimalsPresentOutput = await response.json();
    expect(response.status).toBe(200);
    expect(output).toHaveLength(3);
  });
});
