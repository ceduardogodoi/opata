import { UnknownError } from "../errors/unknown/unknown.error";
import type { HttpHandler } from "../http.types";
import { strategies } from "./route-handler-error-strategy/error-handler-strategies";
import type { RouteHandlerErrorStrategy } from "./route-handler-error-strategy/route-handler-error-strategy.interface";

export abstract class RouteHandler {
  readonly #errorHandlersStrategy: RouteHandlerErrorStrategy[];

  constructor() {
    this.#errorHandlersStrategy = strategies;

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

      // error handler strategy context
      for (const errorHandlerStrategy of this.#errorHandlersStrategy) {
        if (errorHandlerStrategy.canHandle(error)) {
          const response = errorHandlerStrategy.handle(error, pathname);

          response.headers.set("Content-Type", "application/problem+json");
          return response;
        }
      }

      // fallback error / generic error
      const unknownError = new UnknownError(pathname);

      return Response.json(unknownError, {
        status: 500,
        headers: {
          "Content-Type": "application/problem+json",
        },
      });
    }
  }

  abstract handleImpl(request: Request): Promise<Response>;

  public async handle(request: Request): Promise<Response> {
    const response = await this.process(request, this.handleImpl);

    return response;
  }
}
