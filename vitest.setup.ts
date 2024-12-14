import "reflect-metadata";
import { container } from "tsyringe";
import { AnimalInMemoryRepository } from "@/app/infra/repositories/animal/animal-inmemory.repository";

class SetupVitest {
  private constructor() {}

  static #setupDependencies(): void {
    container.register("AnimalRepositoryGateway", {
      useValue: AnimalInMemoryRepository.create(),
    });
  }

  public static init(): void {
    SetupVitest.#setupDependencies();
  }
}

SetupVitest.init();
