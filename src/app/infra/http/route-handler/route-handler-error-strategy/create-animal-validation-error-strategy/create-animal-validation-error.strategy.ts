import { CreateAnimalValidationError } from "../../../errors/create-animal-validation/create-animal-validation.error";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class CreateAnimalValidationErrorStrategy
  implements RouteHandlerErrorStrategy
{
  public canHandle(error: unknown): error is CreateAnimalValidationError {
    return error instanceof CreateAnimalValidationError;
  }

  public handle(
    error: CreateAnimalValidationError,
    pathname: string
  ): Response {
    error.instance = pathname;

    return Response.json(error, {
      status: 400,
    });
  }
}
