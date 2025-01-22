import { describe, expect, it } from "vitest";
import { container } from "tsyringe";
import { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { User } from "@/app/domain/user/entity/user";
import { createUserFixture, userFixture } from "@/app/fixtures/user.fixture";
import { UUID_REGEX } from "@/app/globals/constants";

describe("repositories / user", () => {
  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  it("should save a user", async () => {
    const user = User.create(createUserFixture);

    const output = await userRepository.upsert(user);
    expect(output.id).toMatch(UUID_REGEX);
  });

  it("should update user data and update its updatedAt property", async () => {
    const user = User.with(userFixture);
    await userRepository.upsert(user);

    const userCopy = Object.assign({}, userFixture);
    userCopy.email = "foo.bar@email.com";
    const userWithModifiedEmail = User.with(userCopy);

    const updatedUser = await userRepository.upsert(userWithModifiedEmail);

    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.fullName).toBe(user.fullName);
    expect(updatedUser.createdAt).toEqual(user.createdAt);
    expect(updatedUser.updatedAt).not.toEqual(user.updatedAt);
  });

  it("should retrieve a user by its id", async () => {
    const users: User[] = [];

    for (let i = 0; i < 3; i++) {
      const user = User.create(createUserFixture);
      await userRepository.upsert(user);

      users.push(user);
    }

    const [, , lastUser] = users;

    const user = await userRepository.findById(lastUser.id);
    expect(user).not.toBeUndefined();
    expect(user?.id).toBe(lastUser.id);
  });

  it("should return undefined when a invalid id is passed", async () => {
    const user = await userRepository.findById(
      "026061b4-6a6e-4d12-aee3-34e0d4662439"
    );
    expect(user).toBeUndefined();
  });
});
