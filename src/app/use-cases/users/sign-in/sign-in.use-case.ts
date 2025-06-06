import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import type { UseCase } from "../../use-case.interface";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import type { SignInInputDto, SignInOutputDto } from "./sign-in.dto";
import { InvalidCredentialsError } from "@/app/infra/http/errors/invalid-credentials/invalid-credentials";
import { JwtService } from "@/app/infra/security/jwt-service";

@injectable()
export class SignInUseCase implements UseCase<SignInInputDto, SignInOutputDto> {
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

  public async execute(input: SignInInputDto): Promise<SignInOutputDto> {
    const user = await this.#userRepositoryGateway.findByUsername(
      input.username
    );
    if (user == null) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await bcrypt.compare(
      input.password,
      user.passwordHash
    );
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    };

    const token = JwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}
