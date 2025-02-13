import { SignInUseCase } from "@/app/use-cases/users/sign-in/sign-in.use-case";
import { RouteHandler } from "../../route-handler/route-handler";

export class SignInRoute extends RouteHandler {
  readonly #signInUseCase: SignInUseCase;

  constructor(signInUseCase: SignInUseCase) {
    super();

    this.#signInUseCase = signInUseCase;

    this.handle = this.handle.bind(this);
    this.handleImpl = this.handleImpl.bind(this);
  }

  public static create(signInUseCase: SignInUseCase): SignInRoute {
    return new SignInRoute(signInUseCase);
  }

  public async handleImpl(request: Request): Promise<Response> {
    const data = await request.json();

    const accessToken = await this.#signInUseCase.execute(data);

    return Response.json(accessToken, {
      status: 200,
    });
  }
}
