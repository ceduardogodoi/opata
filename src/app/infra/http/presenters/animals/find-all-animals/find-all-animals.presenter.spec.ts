import { describe, expect, it } from "vitest";
import { animalInstanceFixture } from "@/app/fixtures/animal.fixtures";
import { FindAllAnimalsPresentOutput } from "./find-all-animals.presenter.dto";
import { FindAllAnimalsPresenter } from "./find-all-animals.presenter";

describe("presenters / create-animal", () => {
  it("should throw an error if the constructor is called", () => {
    expect(() => new FindAllAnimalsPresenter()).toThrowError(
      "FindAllAnimalsPresenter constructor is private."
    );
  });

  it("should return the created animal json representation", () => {
    const animals = [animalInstanceFixture];
    const response = FindAllAnimalsPresenter.present(animals);

    const expectedResponse: FindAllAnimalsPresentOutput = [
      {
        id: animalInstanceFixture.id,
        name: animalInstanceFixture.name,
        isAdopted: animalInstanceFixture.isAdopted,
        age: animalInstanceFixture.age,
        history: animalInstanceFixture.history,
        observations: animalInstanceFixture.observations,
      },
    ];

    expect(response).toEqual(expectedResponse);
  });
});
