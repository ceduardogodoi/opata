import type { Pageable, Paged } from "@/app/types/pagination.types";
import { Animal } from "../entity/animal";

/**
 * Interface representing a gateway for animal repository operations.
 */
export interface AnimalRepositoryGateway {
  /**
   * Saves an animal to the repository.
   * @param animal - The animal entity to be saved.
   * @returns A promise that resolves to the saved animal entity.
   */
  save(animal: Animal): Promise<Animal>;

  /**
   * Finds an animal by its ID.
   * @param id - The unique identifier of the animal.
   * @returns A promise that resolves to the animal entity if found, or null if not found.
   */
  findById(id: string): Promise<Animal | null>;

  /**
   * Retrieves all animals from the repository.
   * @returns A promise that resolves to a paginated list of animal entities.
   */
  findAll(pageable?: Pageable): Promise<Paged<Animal>>;
}
