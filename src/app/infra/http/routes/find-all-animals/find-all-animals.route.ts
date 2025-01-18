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

  #handle = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));
    const pageSize = Number(url.searchParams.get("pageSize"));

    const pageable: Pageable = {
      page,
      pageSize,
    };

    const output = await this.#findAllAnimalsUseCase.execute(pageable);

    if (output.items.length < 1) {
      return Response.json(output, {
        status: 404,
      });
    }

    return Response.json(output, {
      status: 200,
    });
  };

  public async handle(request: Request): Promise<Response> {
    const response = await this.process(request, this.#handle);

    return response;
  }
}
