import { InputValidationError } from "../../../errors/input-validation/input-validation.error";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class InputValidationErrorStrategy implements RouteHandlerErrorStrategy {
  readonly #id: string;

  constructor() {
    this.#id = "InputValidationErrorStrategy";
  }

  public get id(): string {
    return this.#id;
  }

  public canHandle(error: unknown): error is InputValidationError {
    return error instanceof InputValidationError;
  }

  public handle(error: InputValidationError, pathname: string): Response {
    error.instance = pathname;

    return Response.json(error, {
      status: 400,
    });
  }
}
