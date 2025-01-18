import { CreateAnimalValidationError } from "../errors/create-animal-validation/create-animal-validation.error";
import { NoResourcesFoundError } from "../errors/no-resources-found/no-resources-found.error";
import { UnknownError } from "../errors/unknown/unknown.error";
import { HttpHandler } from "../http.types";

export abstract class RouteHandler {
  constructor() {
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
      const instance = new URL(request.url).pathname;

      if (error instanceof CreateAnimalValidationError) {
        return Response.json(error, {
          status: 400,
        });
      }

      if (error instanceof NoResourcesFoundError) {
        error.setInstance = instance;

        return Response.json(error, {
          status: 404,
        });
      }

      const unknownError = new UnknownError(instance);
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
