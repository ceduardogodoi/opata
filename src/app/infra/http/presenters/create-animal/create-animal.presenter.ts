import { Animal } from "@/app/domain/animal/entity/animal";
import { CreateAnimalOutput } from "./create-animal.presenter.dto";

export class CreateAnimalPresenter {
  constructor() {
    throw new Error("CreateAnimalPresenter constructor is private");
  }

  public static present(animal: Animal): CreateAnimalOutput {
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
