import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
import { RouteHandle } from "../route.handle.interface";
import { Pageable } from "@/app/types/pagination.types";

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

  public async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || undefined;
    const pageSize = Number(url.searchParams.get("pageSize")) || undefined;

    let pageable: Pageable | undefined;
    if (!Number.isNaN(page) && !Number.isNaN(pageSize)) {
      pageable = {
        page,
        pageSize,
      };
    }

    const output = await this.#findAllAnimalsUseCase.execute(pageable);

    if (output.items.length < 1) {
      return Response.json(output, {
        status: 404,
      });
    }

    return Response.json(output, {
      status: 200,
    });
  }
}
