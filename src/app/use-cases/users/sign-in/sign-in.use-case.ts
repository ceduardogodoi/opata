import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UseCase } from "../../use-case.interface";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import type { SignInInputDto } from "./sign-in.dto";
import { env } from "@/app/env";

@injectable()
export class SignInUseCase implements UseCase<SignInInputDto, string> {
  readonly #userRepositoryGateway: UserRepositoryGateway;

  constructor(
    @inject("UserRepositoryGateway")
    userRepositoryGateway: UserRepositoryGateway
  ) {
    this.#userRepositoryGateway = userRepositoryGateway;
  }

  public static create(
    userRepositoryGateway: UserRepositoryGateway
  ): SignInUseCase {
    return new SignInUseCase(userRepositoryGateway);
  }

  public async execute(input: SignInInputDto): Promise<string> {
    const user = await this.#userRepositoryGateway.findByUsername(
      input.username
    );
    const passwordMatch = await bcrypt.compare(
      input.password,
      user.passwordHash
    );
    if (!passwordMatch) {
      // TODO: create the correct error type for this
      throw new Error("Username or password is invalid.");
    }

    const payload = user.toJSON();
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
}
