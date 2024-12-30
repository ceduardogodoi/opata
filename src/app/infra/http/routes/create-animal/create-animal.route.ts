import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { CreateAnimalPresenter } from "../../presenters/create-animal/create-animal.presenter";
import { CreateAnimalValidation } from "../../validation/create-animal/create-animal.validation";
import { RouteHandle } from "../route.handle.interface";

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
    const data = await request.json();

    const createAnimalValidation = CreateAnimalValidation.create();
    const result = createAnimalValidation.validate(data);
    if (result.error != null) {
      const output = createAnimalValidation.present(result.data);
      return Response.json(output, {
        status: result.statusCode,
      });
    }

    const animal = await this.#createAnimalUseCase.execute(result.data);
    const output = CreateAnimalPresenter.present(animal);

    return Response.json(output, {
      status: result.statusCode,
    });
  }
}
