import { describe, expect, it } from "vitest";
import { animalInstanceFixture } from "@/app/fixtures/animal.fixtures";
import { CreateAnimalPresenter } from "./create-animal.presenter";
import { CreateAnimalOutput } from "./create-animal.presenter.dto";

describe("presenters / create-animal", () => {
  it("should return the created animal json representation", () => {
    const response = CreateAnimalPresenter.present(animalInstanceFixture);

    const expectedResponse: CreateAnimalOutput = {
      id: animalInstanceFixture.id,
      name: animalInstanceFixture.name,
      isAdopted: animalInstanceFixture.isAdopted,
      age: animalInstanceFixture.age,
      history: animalInstanceFixture.history,
      observations: animalInstanceFixture.observations,
    };

    expect(response).toStrictEqual(expectedResponse);
  });
});
