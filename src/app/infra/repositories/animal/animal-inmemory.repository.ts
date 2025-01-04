import { Animal } from "@/app/domain/animal/entity/animal";
import { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import type { Pageable, Paged } from "@/app/types/pagination.types";

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

  public async findAll(pageable: Pageable = {}): Promise<Paged<Animal>> {
    const page = pageable.page ?? 1;
    const pageSize = pageable.pageSize ?? 10;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const items = this.#animals.slice(startIndex, endIndex);
    const totalItems = this.#animals.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = items.length > 0 ? page : 0;

    return {
      items,
      totalItems,
      totalPages,
      currentPage,
    };
  }
}
