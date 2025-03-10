import { inject, injectable } from "tsyringe";
import { z } from "zod";
import type { UseCase } from "../../use-case.interface";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { InputValidationError } from "@/app/infra/http/errors/input-validation/input-validation.error";
import type {
  FindByUsernameInputDto,
  FindByUsernameOutputDto,
} from "./find-by-username.dto";

const usernameSchema = z
  .string({
    required_error: "Username is required.",
  })
  .min(4, "Username should have at least 4 characters.");

@injectable()
export class FindByUsernameUseCase
  implements UseCase<FindByUsernameInputDto, FindByUsernameOutputDto>
{
  readonly #userRepositoryGateway: UserRepositoryGateway;

  constructor(
    @inject("UserRepositoryGateway")
    userRepositoryGateway: UserRepositoryGateway
  ) {
    this.#userRepositoryGateway = userRepositoryGateway;
  }

  public static create(
    userRepositoryGateway: UserRepositoryGateway
  ): FindByUsernameUseCase {
    return new FindByUsernameUseCase(userRepositoryGateway);
  }

  public async execute(input: string): Promise<FindByUsernameOutputDto> {
    const username = this.#validate(input);

    const user = await this.#userRepositoryGateway.findByUsername(username);
    return user;
  }

  #validate(input: string): string {
    const result = usernameSchema.safeParse(input);

    if (!result.success) {
      const [error] = result.error.errors;
      const fieldErrors = {
        username: [error.message],
      };

      throw new InputValidationError(fieldErrors);
    }

    return result.data;
  }
}
