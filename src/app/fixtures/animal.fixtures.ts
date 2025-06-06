import type {
  AnimalLike,
  CreateAnimal,
} from "@/app/domain/animal/entity/animal.types";
import { Animal } from "@/app/domain/animal/entity/animal";

/**
 * Fake Data for Create Animal.
 *
 * - Name: `Dog`
 * - Date of Birth: `2023-01-01`
 * - History: `History Dog lorem ipsum`
 * - Observations: `Observations Dog Lorem ipsum`
 */
export const createAnimalFixture: CreateAnimal = {
  name: "Dog",
  dateOfBirth: "2023-01-01T00:00:00.000Z",
  history: "History Dog lorem ipsum",
  observations: "Observations Dog Lorem ipsum",
};

/**
 * Fake Data for Animal.
 *
 * - ID: `bf38b884-0e4d-4443-9be2-47cc2bf26fe5`
 * - Name: `Cat`
 * - Date of Birth: `2023-01-01`
 * - History: `History Cat lorem ipsum`
 * - Observations: `Observations Cat Lorem ipsum`
 */
export const animalFixture: AnimalLike = {
  id: "bf38b884-0e4d-4443-9be2-47cc2bf26fe5",
  name: "Cat",
  isAdopted: false,
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
  updatedAt: new Date("2025-01-01T00:00:00.000Z"),
  dateOfBirth: "2023-01-01T00:00:00.000Z",
  history: "History Cat lorem ipsum",
  observations: "Observations Cat Lorem ipsum",
};

/**
 * Fake Data for  Animal Instance.
 *
 * - ID: `bf38b884-0e4d-4443-9be2-47cc2bf26fe5`
 * - Name: `Cat`
 * - Date of Birth: `2023-01-01`
 * - History: `History Cat lorem ipsum`
 * - Observations: `Observations Cat Lorem ipsum`
 */
export const animalInstanceFixture = Animal.with(animalFixture);

/**
 * Fake Data for Inexistent Animal ID.
 *
 * - ID: bf38b884-0e4d-4443-9be2-47cc2bf26fe6
 */
export const inexistentAnimalId = "bf38b884-0e4d-4443-9be2-47cc2bf26fe6";
