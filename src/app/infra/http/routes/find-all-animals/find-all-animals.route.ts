import { FindAllAnimalsUseCase } from "@/app/use-cases/find-all-animals/find-all-animals.usecase";
import { Pageable } from "@/app/types/pagination.types";
import { RouteHandler } from "../../route-handler/route-handler";

export class FindAllAnimalsRoute extends RouteHandler {
  readonly #findAllAnimalsUseCase: FindAllAnimalsUseCase;

  constructor(findAllAnimalsUseCase: FindAllAnimalsUseCase) {
    super();

    this.#findAllAnimalsUseCase = findAllAnimalsUseCase;

    this.handle = this.handle.bind(this);
    this.handleImpl = this.handleImpl.bind(this);
  }

  public static create(
    findAllAnimalsUseCase: FindAllAnimalsUseCase
  ): FindAllAnimalsRoute {
    return new FindAllAnimalsRoute(findAllAnimalsUseCase);
  }

  public async handleImpl(request: Request): Promise<Response> {
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
  }
}
