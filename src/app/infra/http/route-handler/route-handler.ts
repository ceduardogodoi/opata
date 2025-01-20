import { UnknownError } from "../errors/unknown/unknown.error";
import type { HttpHandler } from "../http.types";
import { errorStrategies } from "./route-handler-error-strategy/error-strategies";
import type { RouteHandlerErrorStrategy } from "./route-handler-error-strategy/route-handler-error-strategy.interface";

export abstract class RouteHandler {
  readonly #errorHandlers: RouteHandlerErrorStrategy[];

  constructor() {
    this.#errorHandlers = errorStrategies;

    this.process = this.process.bind(this);
  }

  public async process(
    request: Request,
    handler: HttpHandler
  ): Promise<Response> {
    try {
      const response = await handler(request);

      return response;
    } catch (error: unknown) {
      const pathname = new URL(request.url).pathname;

      for (const errorHandler of this.#errorHandlers) {
        if (errorHandler.canHandle(error)) {
          const response = errorHandler.handle(error, pathname);

          return response;
        }
      }

      // fallback error / generic error
      const unknownError = new UnknownError(pathname);

      return Response.json(unknownError, {
        status: 500,
      });
    }
  }

  abstract handleImpl(request: Request): Promise<Response>;

  public async handle(request: Request): Promise<Response> {
    const response = await this.process(request, this.handleImpl);

    return response;
  }
}
