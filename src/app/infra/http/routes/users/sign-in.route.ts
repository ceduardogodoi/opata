// import { cookies } from "next/headers";
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

    const token = await this.#signInUseCase.execute(data);

    // const cookieStore = await cookies();
    // cookieStore.set("access_token", token);

    return Response.json(token, {
      status: 200,
    });
  }
}
