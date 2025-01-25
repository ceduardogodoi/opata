import { Animal } from "@/app/domain/animal/entity/animal";
import type { CreateAnimalPresentOutput } from "./create-animal.presenter.dto";

export class CreateAnimalPresenter {
  constructor() {
    throw new Error("CreateAnimalPresenter constructor is private.");
  }

  public static present(animal: Animal): CreateAnimalPresentOutput {
    return {
      id: animal.id,
      name: animal.name,
      isAdopted: animal.isAdopted,
      age: animal.age,
      history: animal.history,
      observations: animal.observations,
    };
  }
}
