import "reflect-metadata";
import { container } from "tsyringe";
import { AnimalInMemoryRepository } from "@/app/infra/repositories/animal/animal-inmemory.repository";

class VitestSetup {
  private constructor() {}

  static #setupDependencies(): void {
    container.register("AnimalRepositoryGatewayUnit", {
      useValue: AnimalInMemoryRepository.create(),
    });
    // .register("AnimalRepositoryGatewayIntegration", {
    //   useValue: AnimalInMemoryRepository.create(),
    // });
  }

  public static init(): void {
    VitestSetup.#setupDependencies();
  }
}

VitestSetup.init();
