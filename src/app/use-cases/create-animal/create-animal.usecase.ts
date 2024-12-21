import { inject, injectable } from "tsyringe";
import type { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.types";
import type { UseCase } from "../use-case.interface";
import type {
  CreateAnimalInputDto,
  CreateAnimalOutputDto,
} from "./create-animal.dto";
import { Animal } from "@/app/domain/animal/entity/animal";

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
    const animal = Animal.create(input);

    const savedAnimal = await this.#animalRepositoryGateway.save(animal);
    return savedAnimal;
  }
}
