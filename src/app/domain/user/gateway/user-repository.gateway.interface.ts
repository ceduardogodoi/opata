import { User } from "../entity/user";

/**
 * Interface for User Repository Gateway.
 * Provides methods to interact with the user repository.
 */
export interface UserRepositoryGateway {
  /**
   * Inserts or updates a user in the repository.
   *
   * @param {User} user - The user entity to be upserted.
   * @returns {Promise<User>} - A promise that resolves to the upserted user.
   */
  upsert(user: User): Promise<User>;

  /**
   * Finds a user by their ID.
   *
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<User | undefined>} - A promise that resolves to the user if found, or undefined if not found.
   */
  findById(id: string): Promise<User | undefined>;
}
