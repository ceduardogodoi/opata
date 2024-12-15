// Dependency Injection Container
import "@/app/container";

import { container } from "tsyringe";
import { CreateAnimalRouteHandler } from "@/app/infra/http/route-handlers/create-animal.route-handler";
import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway";

const animalRepository = container.resolve<AnimalRepositoryGateway>(
  "AnimalRepositoryGateway"
);
const createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
const createAnimalRouteHandler =
  CreateAnimalRouteHandler.create(createAnimalUseCase);

export const POST = createAnimalRouteHandler.handle;
