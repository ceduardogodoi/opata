import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { CreateAnimalPresenter } from "../presenters/create-animal/create-animal.presenter";
import { CreateAnimalInputDto } from "@/app/use-cases/create-animal/create-animal.dto";

export class CreateAnimalRoute {
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
    // fix with zod
    const data: CreateAnimalInputDto = await request.json();

    const animal = await this.#createAnimalUseCase.execute(data);
    const output = CreateAnimalPresenter.present(animal);

    return Response.json(output, {
      status: 201,
    });
  }
}
