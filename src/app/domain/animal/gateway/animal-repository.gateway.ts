import { Animal } from "../entity/animal";

export interface AnimalRepositoryGateway {
  save(animal: Animal): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  findAll(): Promise<Animal[]>;
}
