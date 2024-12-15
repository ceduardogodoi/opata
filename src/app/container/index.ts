import { container } from "tsyringe";
import { AnimalInMemoryRepository } from "../infra/repositories/animal/animal-inmemory.repository";

export class DependencyInjectionContainerSetup {
  public static init(): void {
    container.register("AnimalRepositoryGateway", {
      useValue: AnimalInMemoryRepository.create(),
    });
  }
}

DependencyInjectionContainerSetup.init();
