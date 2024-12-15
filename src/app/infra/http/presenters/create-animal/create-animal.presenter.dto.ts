import { Animal } from "@/app/domain/animal/entity/animal";

export type CreateAnimalInput = Animal;

export interface CreateAnimalOutput {
  id: string;
  name: string;
  isAdopted: boolean;
  age?: number;
  history?: string;
  observations?: string;
}
