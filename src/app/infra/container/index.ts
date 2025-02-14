import "reflect-metadata";
import { container } from "tsyringe";
import type { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import { CreateAnimalUseCase } from "@/app/use-cases/animals/create-animal/create-animal.usecase";
import { CreateAnimalRoute } from "../http/routes/animals/create-animal/create-animal.route";
import { FindAllAnimalsUseCase } from "@/app/use-cases/animals/find-all-animals/find-all-animals.usecase";
import { FindAllAnimalsRoute } from "../http/routes/animals/find-all-animals/find-all-animals.route";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { SignUpUseCase } from "@/app/use-cases/users/sign-up/sign-up.usecase";
import { SignUpRoute } from "../http/routes/users/sign-up.route";
import { InstancesManager } from "./instances-manager";
import { SignInUseCase } from "@/app/use-cases/users/sign-in/sign-in.use-case";
import { SignInRoute } from "../http/routes/users/sign-in.route";

InstancesManager.init();

// #region - animals
const animalRepository = container.resolve<AnimalRepositoryGateway>(
  "AnimalRepositoryGateway"
);

// use case: create animal
const createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
export const createAnimalRouteHandler =
  CreateAnimalRoute.create(createAnimalUseCase);

// use case: find animals
const findAllAnimalsUseCase = FindAllAnimalsUseCase.create(animalRepository);
export const findAllAnimalsRouteHandler = FindAllAnimalsRoute.create(
  findAllAnimalsUseCase
);
// #endregion

// #region - users
const userRepository = container.resolve<UserRepositoryGateway>(
  "UserRepositoryGateway"
);
const signUpUseCase = SignUpUseCase.create(userRepository);
export const signUpRouteHandler = SignUpRoute.create(signUpUseCase);

const signInUseCase = SignInUseCase.create(userRepository);
export const signInRouteHandler = SignInRoute.create(signInUseCase);
// #endregion
