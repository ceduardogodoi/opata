import { describe, expect, it } from "vitest";
import { container } from "tsyringe";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { User } from "@/app/domain/user/entity/user";
import { createUserFixture } from "@/app/fixtures/user.fixture";
import { UUID_REGEX } from "@/app/globals/constants";
import { DuplicateResourceError } from "../../http/errors/duplicate-resource/duplicate-resource.error";
import { NoResourcesFoundError } from "../../http/errors/no-resources-found/no-resources-found.error";

describe("repositories / user", () => {
  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  it("should save a user", async () => {
    const user = await User.create(createUserFixture);

    const output = await userRepository.save(user);
    expect(output.id).toMatch(UUID_REGEX);
  });

  it("should not save two users with same username", async () => {
    const userCopy = await User.create(createUserFixture);

    await expect(() => userRepository.save(userCopy)).rejects.toThrowError(
      DuplicateResourceError
    );
  });

  it("should get a user by its id", async () => {
    const newUser = await User.create({
      ...createUserFixture,
      username: "xpto",
    });

    await userRepository.save(newUser);

    const user = await userRepository.findById(newUser.id);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  it("should get a user by its username", async () => {
    const newUser = await User.create({
      ...createUserFixture,
      username: "random",
    });

    await userRepository.save(newUser);

    const user = await userRepository.findByUsername(newUser.username);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  it("should update a user's data by its id", async () => {
    const newUser = await User.create({
      fullName: "Jimmy Doe",
      email: "jimmy@email.com",
      username: "jimmydoe",
      password: "zaxscdvf",
    });
    const updatedAtInitialValue = newUser.updatedAt;

    await userRepository.save(newUser);

    await userRepository.update(newUser.id, {
      fullName: "Jeff Doe",
      email: "jeff.doe@email.com",
      username: "jeffdoe",
    });

    const user = await userRepository.findById(newUser.id);
    const updatedAtUpdatedValue = user.updatedAt;

    expect(user).toBeDefined();
    expect(user).toEqual(
      expect.objectContaining({
        id: newUser.id,
        fullName: "Jeff Doe",
        email: "jeff.doe@email.com",
        username: "jeffdoe",
        createdAt: newUser.createdAt,
      })
    );
    expect(updatedAtInitialValue).not.toEqual(updatedAtUpdatedValue);
  });

  it("should throw NoResourcesFoundError when id does not exist", async () => {
    const invalidId = "7202f5e9-1dfd-4fca-a928-6e9537d1ab81";
    await expect(() => userRepository.findById(invalidId)).rejects.toThrowError(
      NoResourcesFoundError
    );
  });

  it("should return null when username does not exist", async () => {
    const invalidUsername = "qwerty";
    const userNotFound = await userRepository.findByUsername(invalidUsername);
    expect(userNotFound).toBeNull();
  });
});
