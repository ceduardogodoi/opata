import { User } from "@/app/domain/user/entity/user";
import { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { DuplicateResourceError } from "../../http/errors/duplicate-resource/duplicate-resource.error";
import { NoResourcesFoundError } from "../../http/errors/no-resources-found/no-resources-found.error";

export class UserInMemoryRepository implements UserRepositoryGateway {
  #users: Map<string, User>;

  private constructor() {
    this.#users = new Map<string, User>();
  }

  public static create(): UserInMemoryRepository {
    return new UserInMemoryRepository();
  }

  public async upsert(input: User): Promise<User> {
    const user = this.#users.get(input.username);
    if (user != null) {
      throw new DuplicateResourceError();
    }

    this.#users.set(input.username, input);

    return input;
  }

  public async findById(id: string): Promise<User | undefined> {
    const users = Array.from(this.#users.values());
    const user = users.find((user) => id === user.id);
    if (user == null) {
      throw new NoResourcesFoundError();
    }

    return user;
  }
}
