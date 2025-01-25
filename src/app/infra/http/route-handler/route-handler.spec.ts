import { describe, expect, it } from "vitest";
import { RouteHandler } from "./route-handler";
import { InputValidationError } from "../errors/input-validation/input-validation.error";
import type { HttpHandler } from "../http.types";
import { NoResourcesFoundError } from "../errors/no-resources-found/no-resources-found.error";
import type { CreateAnimalInputDto } from "@/app/use-cases/animals/create-animal/create-animal.dto";
import type { FindAllAnimalsOutputDto } from "@/app/use-cases/animals/find-all-animals/find-all-animals.dto";

class RouteHandlerTestImpl extends RouteHandler {
  async handleImpl(): Promise<Response> {
    throw new Error("Unused.");
  }
}

describe("route handler", () => {
  let handler: HttpHandler;
  const routeHandler = new RouteHandlerTestImpl();

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

    const response = await routeHandler.process(request, handler);
    const output = await response.json();
    expect(response.status).toBe(500);
    expect(output.type).toBe("https://example.com/probs/unknown");
    expect(output.title).toBe("An unknown error has occured.");
    expect(output.detail).toBe(
      "An unknown error has occured in our servers. Please try again later."
    );
    expect(output.instance).toBe("/api/animals");
    expect(response.headers.get("Content-Type")).toBe(
      "application/problem+json"
    );
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

      throw new InputValidationError(fieldErrors);
    };

    const response = await routeHandler.process(request, handler);
    const output = await response.json();
    expect(response.status).toBe(400);
    expect(output.type).toBe("https://example.com/probs/input-validation");
    expect(output.title).toBe("You have entered invalid input data.");
    expect(output.detail).toBe("Input with invalid value for field(s): name");
    expect(output.instance).toBe("/api/animals");
    expect(output.fields).toEqual({
      name: ["Name is required."],
    });
    expect(response.headers.get("Content-Type")).toBe(
      "application/problem+json"
    );
  });

  it("should return 404 when no resources are found", async () => {
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<FindAllAnimalsOutputDto> => {
        return Promise.resolve({
          currentPage: 0,
          items: [],
          totalItems: 0,
          totalPageItems: 0,
          totalPages: 0,
        });
      },
      url,
    } as Request;

    handler = async (): Promise<Response> => {
      throw new NoResourcesFoundError();
    };

    const response = await routeHandler.process(request, handler);
    const output = await response.json();
    expect(response.status).toBe(404);
    expect(output.type).toBe("https://example.com/probs/no-resources-found");
    expect(output.title).toBe("No resources were found for your request.");
    expect(output.detail).toBe(
      "The request you made has not found any resources."
    );
    expect(output.instance).toBe("/api/animals");
    expect(response.headers.get("Content-Type")).toBe(
      "application/problem+json"
    );
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

    const response = await routeHandler.process(request, handler);
    const output = await response.json();
    expect(response.status).toBe(200);
    expect(output).toEqual(value);
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });
});
