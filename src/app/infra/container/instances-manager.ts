import { container } from "tsyringe";
import { AnimalInMemoryRepository } from "../repositories/animal/animal-inmemory.repository";
import { UserInMemoryRepository } from "../repositories/user/user-inmemory.repository";

export class InstancesManager {
  public static init(): void {
    container
      .register("AnimalRepositoryGateway", {
        useValue: AnimalInMemoryRepository.create(),
      })
      .register("UserRepositoryGateway", {
        useValue: UserInMemoryRepository.create(),
      });
  }
}
