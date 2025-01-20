import { NoResourcesFoundError } from "../../../errors/no-resources-found/no-resources-found.error";
import type { RouteHandlerErrorStrategy } from "../route-handler-error-strategy.interface";

export class NoResourcesFoundErrorStrategy
  implements RouteHandlerErrorStrategy
{
  public canHandle(error: unknown): error is NoResourcesFoundError {
    return error instanceof NoResourcesFoundError;
  }

  public handle(error: NoResourcesFoundError, pathname: string): Response {
    error.instance = pathname;

    return Response.json(error, {
      status: 404,
    });
  }
}
