import { OutputValidationError } from "../../../errors/output-validation/output-validation.error";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class OutputValidationErrorStrategy
  implements RouteHandlerErrorStrategy
{
  readonly #id: string;

  constructor() {
    this.#id = "OutputValidationErrorStrategy";
  }

  public get id(): string {
    return this.#id;
  }

  public canHandle(error: unknown): error is OutputValidationError {
    return error instanceof OutputValidationError;
  }

  public handle(error: OutputValidationError, pathname: string): Response {
    error.instance = pathname;

    return Response.json(error, {
      status: 400,
    });
  }
}
