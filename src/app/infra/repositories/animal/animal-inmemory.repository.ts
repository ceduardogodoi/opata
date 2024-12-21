import { Animal } from "@/app/domain/animal/entity/animal";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.types";

export class AnimalInMemoryRepository implements AnimalRepositoryGateway {
  #animals: Animal[] = [];

  constructor() {}

  public static create(): AnimalInMemoryRepository {
    return new AnimalInMemoryRepository();
  }

  public async save(animal: Animal): Promise<Animal> {
    this.#animals.push(animal);

    return animal;
  }

  public async findById(id: string): Promise<Animal | null> {
    return this.#animals.find((animal) => animal.id === id) ?? null;
  }

  public async findAll(): Promise<Animal[]> {
    return this.#animals;
  }
}
