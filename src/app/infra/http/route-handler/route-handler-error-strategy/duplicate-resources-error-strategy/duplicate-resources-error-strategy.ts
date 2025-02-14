import { DuplicateResourceError } from "../../../errors/duplicate-resource/duplicate-resource.error";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class DuplicateResourceErrorStrategy
  implements RouteHandlerErrorStrategy
{
  readonly #id: string;

  constructor() {
    this.#id = "DuplicateResourceErrorStrategy";
  }

  public get id(): string {
    return this.#id;
  }

  public canHandle(error: unknown): error is DuplicateResourceError {
    return error instanceof DuplicateResourceError;
  }

  public handle(error: DuplicateResourceError, pathname: string): Response {
    error.instance = pathname;

    return Response.json(error, {
      status: 409,
    });
  }
}
