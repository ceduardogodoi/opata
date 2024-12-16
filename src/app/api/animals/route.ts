// Dependency Injection Container
import "@/app/infra/container";

import { container } from "tsyringe";
import { CreateAnimalRoute } from "@/app/infra/http/routes/create-animal.route";
import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway";

const animalRepository = container.resolve<AnimalRepositoryGateway>(
  "AnimalRepositoryGateway"
);
const createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
const createAnimalRouteHandler =
  CreateAnimalRoute.create(createAnimalUseCase);

export const POST = createAnimalRouteHandler.handle;
