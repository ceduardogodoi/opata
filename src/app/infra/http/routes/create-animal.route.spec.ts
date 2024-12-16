import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { CreateAnimalRoute } from "./create-animal.route";
import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway";
import { CreateAnimalInputDto } from "@/app/use-cases/create-animal/create-animal.dto";
import { CreateAnimalOutput } from "../presenters/create-animal/create-animal.presenter.dto";
import { uuidRegex } from "@/app/utils/constants";

describe("routes / create-animal", () => {
  let animalRepository: AnimalRepositoryGateway;
  let createAnimalUseCase: CreateAnimalUseCase;
  let createAnimalRoute: CreateAnimalRoute;
  beforeEach(() => {
    animalRepository = container.resolve("AnimalRepositoryGateway");
    createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
    createAnimalRoute = CreateAnimalRoute.create(createAnimalUseCase);
  });

  it("should create a new animal", async () => {
    const request = {
      json: async (): Promise<CreateAnimalInputDto> => {
        return {
          name: "Turtle",
          age: 10,
          history: "Turtle history",
          observations: "Turtle observations",
        };
      },
    } as Request;

    const response = await createAnimalRoute.handle(request);
    const output: CreateAnimalOutput = await response.json();
    expect(response.status).toBe(201);
    expect(output.id).toMatch(uuidRegex);
  });
});
