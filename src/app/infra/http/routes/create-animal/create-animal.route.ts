import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { RouteHandler } from "../../route-handler/route-handler";
import { CreateAnimalPresenter } from "../../presenters/create-animal/create-animal.presenter";

export class CreateAnimalRoute extends RouteHandler {
  readonly #createAnimalUseCase: CreateAnimalUseCase;

  constructor(createAnimalUseCase: CreateAnimalUseCase) {
    super();

    this.#createAnimalUseCase = createAnimalUseCase;

    this.handle = this.handle.bind(this);
    this.handleImpl = this.handleImpl.bind(this);
  }

  public static create(
    createAnimalUseCase: CreateAnimalUseCase
  ): CreateAnimalRoute {
    return new CreateAnimalRoute(createAnimalUseCase);
  }

  public async handleImpl(request: Request): Promise<Response> {
    const data = await request.json();

    const animal = await this.#createAnimalUseCase.execute(data);
    const output = CreateAnimalPresenter.present(animal);

    return Response.json(output, {
      status: 201,
    });
  }
}
