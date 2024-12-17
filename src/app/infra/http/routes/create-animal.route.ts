import { CreateAnimalUseCase } from "@/app/use-cases/create-animal/create-animal.usecase";
import { CreateAnimalPresenter } from "../presenters/create-animal/create-animal.presenter";
import { z } from "zod";

const createAnimalSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must have at least 2 characters"),
  age: z.number().optional(),
  history: z.string().optional(),
  observations: z.string().optional(),
});

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
    const data = await request.json();
    const result = createAnimalSchema.safeParse(data);

    if (!result.success) {
      const messages = Object.entries(
        result.error.flatten().fieldErrors
      ).flatMap(([, message]) => message);

      const errorOutput = {
        error: "validation_error",
        messages,
      };

      return Response.json(errorOutput, {
        status: 400,
      });
    }

    const animal = await this.#createAnimalUseCase.execute(result.data);
    const output = CreateAnimalPresenter.present(animal);

    return Response.json(output, {
      status: 201,
    });
  }
}
