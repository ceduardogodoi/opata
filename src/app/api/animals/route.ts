// Dependency Injection Container
import "@/app/infra/container";

import { container } from "tsyringe";
import { CreateAnimalRoute } from "@/app/infra/http/routes/create-animal/create-animal.route";
import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
import { FindAllAnimalsRoute } from "@/app/infra/http/routes/find-all-animals/find-all-animals.route";

const animalRepository = container.resolve<AnimalRepositoryGateway>(
  "AnimalRepositoryGateway"
);

// use case: create animal
const createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
const createAnimalRouteHandler = CreateAnimalRoute.create(createAnimalUseCase);
export const POST = createAnimalRouteHandler.handle;

// use case: find all animals
const findAllAnimalsUseCase = FindAllAnimalsUseCase.create(animalRepository);
const findAllAnimalsRouteHandler = FindAllAnimalsRoute.create(
  findAllAnimalsUseCase
);
export const GET = findAllAnimalsRouteHandler.handle;
