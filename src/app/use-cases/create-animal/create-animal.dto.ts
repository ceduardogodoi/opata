import { Animal } from "@/app/domain/animal/entity/animal";

export type CreateAnimalInputDto = {
  name: string;
  age?: number;
  history?: string;
  observations?: string;
};

export type CreateAnimalOutputDto = Animal;
