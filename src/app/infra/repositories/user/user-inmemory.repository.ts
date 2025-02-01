import { User } from "@/app/domain/user/entity/user";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { DuplicateResourceError } from "../../http/errors/duplicate-resource/duplicate-resource.error";
import { NoResourcesFoundError } from "../../http/errors/no-resources-found/no-resources-found.error";
import type { UpdateUser } from "@/app/domain/user/entity/user.types";

export class UserInMemoryRepository implements UserRepositoryGateway {
  #users: Map<string, User>;

  private constructor() {
    this.#users = new Map<string, User>();
  }

  public static create(): UserInMemoryRepository {
    return new UserInMemoryRepository();
  }

  public async save(input: User): Promise<User> {
    const user = this.#users.get(input.username);
    if (user != null) {
      throw new DuplicateResourceError();
    }

    this.#users.set(input.username, input);

    return input;
  }

  public async findById(id: string): Promise<User> {
    const users = Array.from(this.#users.values());
    const user = users.find((user) => id === user.id);
    if (user == null) {
      throw new NoResourcesFoundError();
    }

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = this.#users.get(username);
    if (user == null) {
      throw new NoResourcesFoundError();
    }

    return user;
  }

  public async update(id: string, input: UpdateUser): Promise<User> {
    const user = await this.findById(id);

    user.update({
      fullName: input.fullName,
      email: input.email,
      username: input.username,
    });

    return user;
  }
}
