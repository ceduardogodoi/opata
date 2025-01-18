import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
import { Pageable } from "@/app/types/pagination.types";
import { RouteErrorHandler } from "../../route-error-handler/route-error-handler";

export class FindAllAnimalsRoute extends RouteErrorHandler {
  readonly #findAllAnimalsUseCase: FindAllAnimalsUseCase;

  constructor(findAllAnimalsUseCase: FindAllAnimalsUseCase) {
    super();

    this.#findAllAnimalsUseCase = findAllAnimalsUseCase;

    this.handle = this.handle.bind(this);
  }

  public static create(
    findAllAnimalsUseCase: FindAllAnimalsUseCase
  ): FindAllAnimalsRoute {
    return new FindAllAnimalsRoute(findAllAnimalsUseCase);
  }

  handleImpl = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const pageSize = Number(url.searchParams.get("pageSize"));

    const pageable: Pageable = {
      page,
      pageSize,
    };

    const output = await this.#findAllAnimalsUseCase.execute(pageable);

    return Response.json(output, {
      status: 200,
    });
  };
}
