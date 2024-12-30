import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
import { RouteHandle } from "../route.handle.interface";

export class FindAllAnimalsRoute implements RouteHandle {
  readonly #findAllAnimalsUseCase: FindAllAnimalsUseCase;

  constructor(findAllAnimalsUseCase: FindAllAnimalsUseCase) {
    this.#findAllAnimalsUseCase = findAllAnimalsUseCase;

    this.handle = this.handle.bind(this);
  }

  public static create(
    findAllAnimalsUseCase: FindAllAnimalsUseCase
  ): FindAllAnimalsRoute {
    return new FindAllAnimalsRoute(findAllAnimalsUseCase);
  }

  public async handle(): Promise<Response> {
    const output = await this.#findAllAnimalsUseCase.execute();

    if (output.length < 1) {
      return Response.json(output, {
        status: 404,
      });
    }

    return Response.json(output, {
      status: 200,
    });
  }
}
