import { beforeEach, describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
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
    const request = {
      url: "http://localhost:3000/api/animals",
    } as Request;

    const response = await findAllAnimalsRoute.handle(request);
    const output = await response.json();

    expect(response.status).toBe(404);
    expect(output.totalPageItems).toBe(0);
    expect(output.totalItems).toBe(0);
    expect(output.totalPages).toBe(0);
    expect(output.currentPage).toBe(0);
  });

  it("should return 200 with all 3 registered animals", async () => {
    const request = {
      url: "http://localhost:3000/api/animals",
    } as Request;

    Array.from({ length: 3 }).forEach(async () => {
      await animalRepository.save(animalInstanceFixture);
    });

    const response = await findAllAnimalsRoute.handle(request);
    const output = await response.json();

    expect(response.status).toBe(200);
    expect(output.totalPageItems).toBe(3);
    expect(output.totalItems).toBe(3);
    expect(output.totalPages).toBe(1);
    expect(output.currentPage).toBe(1);
  });

  it("should return 200 with 10 animals from all 20 registered animals", async () => {
    const request = {
      url: "http://localhost:3000/api/animals",
    } as Request;

    Array.from({ length: 17 }).forEach(async () => {
      await animalRepository.save(animalInstanceFixture);
    });

    const response = await findAllAnimalsRoute.handle(request);
    const output = await response.json();

    expect(response.status).toBe(200);
    expect(output.totalPageItems).toBe(10);
    expect(output.totalItems).toBe(20);
    expect(output.totalPages).toBe(2);
    expect(output.currentPage).toBe(1);
  });

  it("should return 200 with default settings when both search params are invalid", async () => {
    const request = {
      url: "http://localhost:3000/api/animals?page=x&pageSize=y",
    } as Request;

    const response = await findAllAnimalsRoute.handle(request);
    const output = await response.json();

    expect(response.status).toBe(200);
    expect(output.totalPageItems).toBe(10);
    expect(output.totalItems).toBe(20);
    expect(output.totalPages).toBe(2);
    expect(output.currentPage).toBe(1);
  });

  it.each([
    { searchParam: "page", value: "x" },
    { searchParam: "pageSize", value: "y" },
  ])(
    "should return 200 with default settings when $searchParam search param is invalid",
    async ({ searchParam, value }) => {
      const request = {
        url: `http://localhost:3000/api/animals?${searchParam}=${value}`,
      } as Request;

      const response = await findAllAnimalsRoute.handle(request);
      const output = await response.json();

      expect(response.status).toBe(200);
      expect(output.totalPageItems).toBe(10);
      expect(output.totalItems).toBe(20);
      expect(output.totalPages).toBe(2);
      expect(output.currentPage).toBe(1);
    }
  );

  it("should return 200 with customized settings when both search params are valid", async () => {
    const request = {
      url: "http://localhost:3000/api/animals?page=2&pageSize=5",
    } as Request;

    const response = await findAllAnimalsRoute.handle(request);
    const output = await response.json();

    expect(response.status).toBe(200);
    expect(output.totalPageItems).toBe(5);
    expect(output.totalItems).toBe(20);
    expect(output.totalPages).toBe(4);
    expect(output.currentPage).toBe(2);
  });
});
