import { InvalidCredentialsError } from "../../../errors/invalid-credentials/invalid-credentials";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class InvalidCredentialsErrorStrategy
  implements RouteHandlerErrorStrategy
{
  readonly #id: string;

  constructor() {
    this.#id = "InvalidCredentialsErrorStrategy";
  }

  public get id(): string {
    return this.#id;
  }

  public canHandle(error: unknown): error is InvalidCredentialsError {
    return error instanceof InvalidCredentialsError;
  }

  public handle(error: InvalidCredentialsError, pathname: string): Response {
    error.instance = pathname;

    return Response.json(error, {
      status: 404,
    });
  }
}
