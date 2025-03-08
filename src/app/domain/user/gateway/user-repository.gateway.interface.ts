import { User } from "../entity/user";
import { UpdateUser } from "../entity/user.types";

/**
 * Interface for User Repository Gateway.
 * Provides methods to interact with the user repository.
 */
export interface UserRepositoryGateway {
  /**
   * Inserts a user in the repository.
   *
   * @param {User} user - The user entity to be inserted.
   * @returns {Promise<User>} - A promise that resolves to the inserted user.
   */
  save(user: User): Promise<User>;

  /**
   * Finds a user by their username.
   *
   * @param {string} username - The username of the user to find.
   * @returns {Promise<User>} A promise that resolves to the user object if found, or null if not found.
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Finds a user by their ID.
   *
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<User>} - A promise that resolves to the user.
   */
  findById(id: string): Promise<User>;

  /**
   * Updates a user by their ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUser} input - The data to update the user with.
   * @returns {Promise<User>} - A promise that resolves to the updated user.
   */
  update(id: string, input: UpdateUser): Promise<User>;
}
