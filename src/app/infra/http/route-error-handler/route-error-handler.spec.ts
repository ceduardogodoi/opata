import { describe, expect, it } from "vitest";
import { RouteErrorHandler } from "./route-error-handler";
import type { CreateAnimalInputDto } from "@/app/use-cases/create-animal/create-animal.dto";
import { CreateAnimalValidationError } from "../errors/create-animal-validation/create-animal-validation.error";
import type { HttpHandler } from "../http.types";

class RouteErrorHandlerTestImpl extends RouteErrorHandler {
  async handle(): Promise<Response> {
    throw new Error("Unused.");
  }
}

describe("route error handler", () => {
  let handler: HttpHandler;
  const routeErrorHandler = new RouteErrorHandlerTestImpl();

  it("should return 500 when an unknown error has occured", async () => {
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<Error> => {
        return Promise.reject(
          new Error("Unknown error when calling Request.json.")
        );
      },
      url,
    } as Request;

    handler = async (request: Request): Promise<Response> => {
      const response = await request.json();

      return response;
    };

    const response = await routeErrorHandler.process(request, handler);
    expect(response.status).toBe(500);
  });

  it("should return 400 when invalid input is entered", async () => {
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<Partial<CreateAnimalInputDto>> => {
        return Promise.resolve({
          name: undefined,
          age: 10,
          history: "Turtle history",
          observations: "Turtle observations",
        });
      },
      url,
    } as Request;

    handler = async (): Promise<Response> => {
      const fieldErrors: Record<string, string[]> = {
        name: ["Name is required."],
      };

      throw new CreateAnimalValidationError(fieldErrors);
    };

    const response = await routeErrorHandler.process(request, handler);
    expect(response.status).toBe(400);
  });

  it("should return the handler status when process succeeds", async () => {
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const value = { message: "ok" };

    const request = {
      json: async (): Promise<typeof value> => {
        return Promise.resolve(value);
      },
      url,
    } as Request;

    handler = async (request: Request): Promise<Response> => {
      const data = await request.json();
      return Response.json(data, {
        status: 200,
      });
    };

    const response = await routeErrorHandler.process(request, handler);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toEqual(value);
  });
});
