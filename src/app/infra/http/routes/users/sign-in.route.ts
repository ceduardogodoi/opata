import { SignInUseCase } from "@/app/use-cases/users/sign-in/sign-in.use-case";
import { RouteHandler } from "../../route-handler/route-handler";
import { cookies } from "next/headers";
import { env } from "@/app/env";

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

    const output = await this.#signInUseCase.execute(data);

    const cookieStore = await cookies();
    cookieStore.set("access_token", output.accessToken, {
      secure: env.NODE_ENV === "production",
      httpOnly: env.NODE_ENV === "production",
    });

    return Response.json(output, {
      status: 200,
    });
  }
}
