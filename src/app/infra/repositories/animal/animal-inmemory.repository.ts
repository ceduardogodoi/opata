import { Animal } from "@/app/domain/animal/entity/animal";
import type { AnimalLike } from "@/app/domain/animal/entity/animal.types";
import type { AnimalRepositoryGateway } from "@/app/domain/animal/gateway/animal-repository.gateway.interface";
import type { FilterCriteria } from "@/app/types/filtering.types";
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

  public async findAll(
    pageable?: Pageable,
    filterCriteria?: FilterCriteria<AnimalLike>
  ): Promise<Paged<Animal>> {
    let animals: Animal[] = this.#animals;
    if (filterCriteria != null) {
      animals = this.#filterByCriteria(filterCriteria);
    }

    const pagination = this.#paginate(animals, pageable);

    return {
      items: pagination.items,
      totalItems: pagination.totalItems,
      totalPages: pagination.totalPages,
      currentPage: pagination.currentPage,
    };
  }

  #filterByCriteria(filterCriteria: FilterCriteria<AnimalLike>): Animal[] {
    const filteredAnimals = this.#animals.filter((animal) => {
      return Object.entries(filterCriteria).every(([key, value]) => {
        const property = key as keyof AnimalLike;
        if (property === "name") {
          return animal.name
            .toLocaleLowerCase()
            .includes(value.toString().toLocaleLowerCase());
        }

        return animal[property] === value;
      });
    });

    return filteredAnimals;
  }

  #paginate(animals: Animal[], pageable: Pageable = {}): Paged<Animal> {
    let page = Number(pageable.page);
    if (isNaN(Number(pageable.pageSize)) || page <= 0) {
      page = 1;
    }

    let pageSize = Number(pageable.pageSize);
    if (isNaN(pageSize) || pageSize <= 0) {
      pageSize = 10;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const items = animals.slice(startIndex, endIndex);
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
