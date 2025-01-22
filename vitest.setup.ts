import "reflect-metadata";
import "@testing-library/jest-dom/vitest";
import { container } from "tsyringe";
import { AnimalInMemoryRepository } from "@/app/infra/repositories/animal/animal-inmemory.repository";
import { UserInMemoryRepository } from "@/app/infra/repositories/user/user-inmemory.repository";

class VitestSetup {
  private constructor() {}

  static #setupDependencies(): void {
    container
      .register("AnimalRepositoryGateway", {
        useValue: AnimalInMemoryRepository.create(),
      })
      .register("UserRepositoryGateway", {
        useValue: UserInMemoryRepository.create(),
      });
  }

  public static init(): void {
    VitestSetup.#setupDependencies();
  }
}

VitestSetup.init();
