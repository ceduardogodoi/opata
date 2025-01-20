import { CreateAnimalValidationError } from "../../../errors/create-animal-validation/create-animal-validation.error";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class CreateAnimalValidationErrorStrategy
  implements RouteHandlerErrorStrategy
{
  readonly #id: string;

  constructor() {
    this.#id = "CreateAnimalValidationErrorStrategy";
  }

  public get id(): string {
    return this.#id;
  }

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
