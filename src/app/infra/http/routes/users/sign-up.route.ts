import { SignUpUseCase } from "@/app/use-cases/users/sign-up/sign-up.usecase";
import { RouteHandler } from "../../route-handler/route-handler";
import { SignUpPresenter } from "../../presenters/users/sign-up.presenter";
import { cookies } from "next/headers";
import { env } from "@/app/env";

export class SignUpRoute extends RouteHandler {
  readonly #signUpUseCase: SignUpUseCase;

  constructor(signUpUseCase: SignUpUseCase) {
    super();

    this.#signUpUseCase = signUpUseCase;

    this.handle = this.handle.bind(this);
    this.handleImpl = this.handleImpl.bind(this);
  }

  public static create(signUpUseCase: SignUpUseCase): SignUpRoute {
    return new SignUpRoute(signUpUseCase);
  }

  public async handleImpl(request: Request): Promise<Response> {
    const data = await request.json();

    const result = await this.#signUpUseCase.execute(data);
    const output = SignUpPresenter.present(result.user);

    const cookieStore = await cookies();
    cookieStore.set("access_token", result.accessToken, {
      secure: env.NODE_ENV === "production",
      httpOnly: env.NODE_ENV === "production",
    });

    return Response.json(output, {
      status: 201,
    });
  }
}
