import { beforeEach, describe, expect, it } from "vitest";
import { animalInstanceFixture } from "@/app/fixtures/animal.fixtures";
import { CreateAnimalPresenter } from "./create-animal.presenter";
import { CreateAnimalOutput } from "./create-animal.presenter.dto";

describe("presenters / create-animal", () => {
  let createAnimalPresenter: CreateAnimalPresenter;
  beforeEach(() => {
    createAnimalPresenter = CreateAnimalPresenter.create();
  });

  it("should return the created animal json representation", () => {
    const response = createAnimalPresenter.present(animalInstanceFixture);

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
