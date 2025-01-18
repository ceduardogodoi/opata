import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { CreateAnimalPresenter } from "../../presenters/create-animal/create-animal.presenter";
import { RouteHandle } from "../route.handle.interface";
import { CreateAnimalValidationError } from "@/app/infra/http/errors/create-animal-validation/create-animal-validation.error";

export class CreateAnimalRoute implements RouteHandle {
  readonly #createAnimalUseCase: CreateAnimalUseCase;

  constructor(createAnimalUseCase: CreateAnimalUseCase) {
    this.#createAnimalUseCase = createAnimalUseCase;

    this.handle = this.handle.bind(this);
  }

  public static create(
    createAnimalUseCase: CreateAnimalUseCase
  ): CreateAnimalRoute {
    return new CreateAnimalRoute(createAnimalUseCase);
  }

  public async handle(request: Request): Promise<Response> {
    const resolvedReponse = await this.#handleError(request, this.#execute);
    return resolvedReponse;
  }

  async #handleError(
    request: Request,
    execute: (request: Request) => Promise<Response>
  ) {
    try {
      const response = await execute(request);

      return response;
    } catch (error: unknown) {
      if (error instanceof CreateAnimalValidationError) {
        return Response.json(error, {
          status: 400,
        });
      }

      return Response.json(error, {
        status: 500,
      });
    }
  }

  #execute = async (request: Request): Promise<Response> => {
    const data = await request.json();

    const animal = await this.#createAnimalUseCase.execute(data);
    const output = CreateAnimalPresenter.present(animal);

    return Response.json(output, {
      status: 201,
    });
  };
}
