import { Animal } from "@/app/domain/animal/entity/animal";
import { CreateAnimalOutput } from "./create-animal.presenter.dto";

export class CreateAnimalPresenter {
  private constructor() {}

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
