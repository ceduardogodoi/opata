import type {
  AnimalLike,
  CreateAnimal,
} from "@/app/domain/animal/entity/animal.types";
import { Animal } from "@/app/domain/animal/entity/animal";

export const createAnimalFixture: CreateAnimal = {
  name: "Dog",
  age: 1,
  history: "History Dog lorem ipsum",
  observations: "Observations Dog Lorem ipsum",
};

export const animalFixture: AnimalLike = {
  id: "bf38b884-0e4d-4443-9be2-47cc2bf26fe5",
  name: "Cat",
  isAdopted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  age: 2,
  history: "History Cat lorem ipsum",
  observations: "Observations Cat Lorem ipsum",
};

export const animalInstanceFixture = Animal.with(animalFixture);

export const inexistentAnimalId = "bf38b884-0e4d-4443-9be2-47cc2bf26fe6";
