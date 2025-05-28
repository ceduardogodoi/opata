import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { CreateAnimalRoute } from "./create-animal.route";
import type { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import type { CreateAnimalPresentOutput } from "../../../presenters/animals/create-animal/create-animal.presenter.dto";
import { UUID_REGEX } from "@/app/globals/constants";
import { CreateAnimalUseCase } from "@/app/use-cases/animals/create-animal/create-animal.usecase";
import type { CreateAnimalInputDto } from "@/app/use-cases/animals/create-animal/create-animal.dto";

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
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<CreateAnimalInputDto> => {
        return Promise.resolve({
          name: "Turtle",
          age: "10",
          history: "Turtle history",
          observations: "Turtle observations",
        });
      },
      url,
    } as Request;

    const response = await createAnimalRoute.handle(request);
    const output: CreateAnimalPresentOutput = await response.json();
    expect(response.status).toBe(201);
    expect(output.id).toMatch(UUID_REGEX);
    expect(output.name).toBe("Turtle");
    expect(output.age).toBe("10");
    expect(output.history).toBe("Turtle history");
    expect(output.observations).toBe("Turtle observations");
  });

  it("should return 400 when invalid input is entered", async () => {
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<Partial<CreateAnimalInputDto>> => {
        return Promise.resolve({
          name: undefined,
          age: "10",
          history: "Turtle history",
          observations: "Turtle observations",
        });
      },
      url,
    } as Request;

    const response = await createAnimalRoute.handle(request);
    expect(response.status).toBe(400);
  });
});
