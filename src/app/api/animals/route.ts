// Dependency Injection Container
import "@/app/infra/container";

import { container } from "tsyringe";
import { CreateAnimalRoute } from "@/app/infra/http/routes/animals/create-animal/create-animal.route";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { FindAllAnimalsRoute } from "@/app/infra/http/routes/animals/find-all-animals/find-all-animals.route";
import { CreateAnimalUseCase } from "@/app/use-cases/animals/create-animal/create-animal.usecase";
import { FindAllAnimalsUseCase } from "@/app/use-cases/animals/find-all-animals/find-all-animals.usecase";

const animalRepository = container.resolve<AnimalRepositoryGateway>(
  "AnimalRepositoryGateway"
);

// #region - use case: create animal
const createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
const createAnimalRouteHandler = CreateAnimalRoute.create(createAnimalUseCase);
// #endregion

// #region - use case: find all animals
const findAllAnimalsUseCase = FindAllAnimalsUseCase.create(animalRepository);
const findAllAnimalsRouteHandler = FindAllAnimalsRoute.create(
  findAllAnimalsUseCase
);
// #endregion

export const POST = createAnimalRouteHandler.handle;
export const GET = findAllAnimalsRouteHandler.handle;
