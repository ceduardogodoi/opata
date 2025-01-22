import { User } from "@/app/domain/user/entity/user";
import { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";

export class UserInMemoryRepository implements UserRepositoryGateway {
  #users: Map<string, User>;

  private constructor() {
    this.#users = new Map<string, User>();
  }

  public static create(): UserInMemoryRepository {
    return new UserInMemoryRepository();
  }

  public async upsert(user: User): Promise<User> {
    const userFound = this.#users.get(user.id);
    if (userFound != null) {
      user.updatedAt = new Date();
    }

    this.#users.set(user.id, user);

    return user;
  }
}
