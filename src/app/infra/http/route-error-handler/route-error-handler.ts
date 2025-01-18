import { CreateAnimalValidationError } from "../errors/create-animal-validation/create-animal-validation.error";
import { UnknownError } from "../errors/unknown/unknown.error";
import { HttpHandler } from "../http.types";

export class RouteErrorHandler {
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
      if (error instanceof CreateAnimalValidationError) {
        return Response.json(error, {
          status: 400,
        });
      }

      const instance = new URL(request.url).pathname;
      const unknownError = new UnknownError(instance);
      return Response.json(unknownError, {
        status: 500,
      });
    }
  }
}
