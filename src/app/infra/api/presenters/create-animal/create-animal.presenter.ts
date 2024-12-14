import { Animal } from "@/app/domain/animal/entity/animal";
import { CreateAnimalOutput } from "./create-animal.presenter.dto";
import { Presenter } from "../presenter";

export class CreateAnimalPresenter
  implements Presenter<Animal, CreateAnimalOutput>
{
  private constructor() {}

  public static create(): CreateAnimalPresenter {
    return new CreateAnimalPresenter();
  }

  public present(animal: Animal): CreateAnimalOutput {
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
