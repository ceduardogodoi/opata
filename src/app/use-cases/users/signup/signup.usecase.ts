import { inject, injectable } from "tsyringe";
import { UseCase } from "../../use-case.interface";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { User } from "@/app/domain/user/entity/user";
import {
  createUserInputSchema,
  type CreateUserInputDto,
  type CreateUserOutputDto,
} from "./signup.dto";
import { InputValidationError } from "@/app/infra/http/errors/input-validation/input-validation.error";

@injectable()
export class SignupUseCase
  implements UseCase<CreateUserInputDto, CreateUserOutputDto>
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
  ): SignupUseCase {
    return new SignupUseCase(userRepositoryGateway);
  }

  public async execute(
    input: CreateUserInputDto
  ): Promise<CreateUserOutputDto> {
    const data = this.#validate(input);
    const user = await User.create(data);

    const savedUser = await this.#userRepositoryGateway.upsert(user);
    return savedUser;
  }

  #validate(input: CreateUserInputDto): CreateUserInputDto {
    const result = createUserInputSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      throw new InputValidationError(fieldErrors);
    }

    return result.data;
  }
}
