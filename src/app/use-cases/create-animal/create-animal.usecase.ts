import { inject, injectable } from "tsyringe";
import type { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import type { UseCase } from "../use-case.interface";
import {
  createAnimalInputSchema,
  type CreateAnimalInputDto,
  type CreateAnimalOutputDto,
} from "./create-animal.dto";
import { Animal } from "@/app/domain/animal/entity/animal";
import { CreateAnimalValidationError } from "@/app/infra/http/errors/create-animal-validation/create-animal-validation.error";

@injectable()
export class CreateAnimalUseCase
  implements UseCase<CreateAnimalInputDto, CreateAnimalOutputDto>
{
  readonly #animalRepositoryGateway: AnimalRepositoryGateway;

  constructor(
    @inject("AnimalRepositoryGateway")
    animalRepositoryGateway: AnimalRepositoryGateway
  ) {
    this.#animalRepositoryGateway = animalRepositoryGateway;
  }

  public static create(
    animalRepositoryGateway: AnimalRepositoryGateway
  ): CreateAnimalUseCase {
    return new CreateAnimalUseCase(animalRepositoryGateway);
  }

  public async execute(
    input: CreateAnimalInputDto
  ): Promise<CreateAnimalOutputDto> {
    const data = this.#validate(input);
    const animal = Animal.create(data);

    const savedAnimal = await this.#animalRepositoryGateway.save(animal);
    return savedAnimal;
  }

  #validate(input: CreateAnimalInputDto): CreateAnimalInputDto {
    const result = createAnimalInputSchema.strip().safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      throw new CreateAnimalValidationError(fieldErrors);
    }

    return result.data;
  }
}
