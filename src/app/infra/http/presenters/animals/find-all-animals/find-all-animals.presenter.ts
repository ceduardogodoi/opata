import { Animal } from "@/app/domain/animal/entity/animal";
import { FindAllAnimalsPresentOutput } from "./find-all-animals.presenter.dto";

export class FindAllAnimalsPresenter {
  constructor() {
    throw new Error("FindAllAnimalsPresenter constructor is private.");
  }

  public static present(animals: Animal[]): FindAllAnimalsPresentOutput {
    const output = animals.map<FindAllAnimalsPresentOutput[number]>(
      (animal) => ({
        id: animal.id,
        name: animal.name,
        isAdopted: animal.isAdopted,
        age: animal.age,
        history: animal.history,
        observations: animal.observations,
      })
    );

    return output;
  }
}
