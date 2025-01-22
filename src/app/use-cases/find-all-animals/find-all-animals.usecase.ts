import { inject, injectable } from "tsyringe";
import { UseCase } from "../use-case.interface";
import type {
  FindAllAnimalsInputDto,
  FindAllAnimalsOutputDto,
} from "./find-all-animals.dto";
import type { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import type { Pageable } from "@/app/types/pagination.types";

@injectable()
export class FindAllAnimalsUseCase
  implements UseCase<FindAllAnimalsInputDto, FindAllAnimalsOutputDto>
{
  readonly #animalRepositoryGateway: AnimalRepositoryGateway;

  constructor(
    @inject("AnimalRepositoryGateway")
    animalRepository: AnimalRepositoryGateway
  ) {
    this.#animalRepositoryGateway = animalRepository;
  }

  public static create(
    animalRepositoryGateway: AnimalRepositoryGateway
  ): FindAllAnimalsUseCase {
    return new FindAllAnimalsUseCase(animalRepositoryGateway);
  }

  public async execute(pageable?: Pageable): Promise<FindAllAnimalsOutputDto> {
    const output = await this.#animalRepositoryGateway.findAll(pageable);

    return output;
  }
}
