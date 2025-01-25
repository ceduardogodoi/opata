// Dependency Injection Container
import "@/app/infra/container";

import { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { SignUpRoute } from "@/app/infra/http/routes/users/sign-up.route";
import { SignUpUseCase } from "@/app/use-cases/users/sign-up/sign-up.usecase";
import { container } from "tsyringe";

const userRepository = container.resolve<UserRepositoryGateway>(
  "UserRepositoryGateway"
);

// #region - use case: sign up
const signUpUseCase = SignUpUseCase.create(userRepository);
const signUpRouteHandler = SignUpRoute.create(signUpUseCase);
// #endregion

export const POST = signUpRouteHandler.handle;
