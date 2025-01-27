import bcrypt from "bcrypt";
import { describe, expect, it, vi } from "vitest";
import { User } from "./user";
import type { UserLike } from "./user.types";
import { UUID_REGEX } from "@/app/globals/constants";
import {
  createUserFixture,
  password,
  userFixture,
} from "@/app/fixtures/user.fixture";

describe("entities / animal", () => {
  it("should create a new user", async () => {
    const mockDate = new Date(2025, 0, 21, 0, 0, 0, 0);
    vi.setSystemTime(mockDate);

    const user = await User.create(createUserFixture);
    const passwordMatch = await bcrypt.compare(
      createUserFixture.password,
      user.passwordHash
    );

    expect(user).toBeInstanceOf(User);
    expect(user.id).toMatch(UUID_REGEX);
    expect(user.fullName).toBe("John Doe");
    expect(user.email).toBe("john.doe@email.com");
    expect(user.username).toBe("jdoe");
    expect(user.passwordHash).toBeDefined();
    expect(passwordMatch).toBe(true);
    expect(user.createdAt).toEqual(mockDate);
    expect(user.updatedAt).toEqual(mockDate);

    vi.useRealTimers();
  });

  it("should create a user with predefined data", async () => {
    const user = User.with(userFixture);

    const passwordMatch = await bcrypt.compare(
      password,
      userFixture.passwordHash
    );

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(userFixture.id);
    expect(passwordMatch).toBe(true);
  });

  it("should get user as JSON for debugging purposes", () => {
    const mockDate = new Date(2025, 0, 21, 0, 0, 0, 0);
    const userFixture: UserLike = {
      id: "73547cf9-0dd1-4217-9bd8-678cba042b35",
      fullName: "John Doe",
      email: "john.doe@email.com",
      username: "jdoe",
      passwordHash:
        "$2b$10$iGODARbBXqgyUi.Ul9P1TObr5FNZOoZXcG7R.FYMCN4vIKshLUJMK",
      createdAt: mockDate,
      updatedAt: mockDate,
    };
    const user = User.with(userFixture);

    const json = user.toJSON();
    expect(json).toStrictEqual({
      id: "73547cf9-0dd1-4217-9bd8-678cba042b35",
      fullName: "John Doe",
      email: "john.doe@email.com",
      username: "jdoe",
      passwordHash:
        "$2b$10$iGODARbBXqgyUi.Ul9P1TObr5FNZOoZXcG7R.FYMCN4vIKshLUJMK",
      createdAt: mockDate,
      updatedAt: mockDate,
    });
  });

  it("should be able to update the user's updatedAt property", () => {
    const user = User.with({
      ...userFixture,
      username: "johndoe",
    });

    const updatedAtSetter = vi.spyOn(user, "updatedAt", "set");

    const date = new Date();
    user.updatedAt = date;

    expect(user.updatedAt).not.toEqual(userFixture.updatedAt);
    expect(updatedAtSetter).toHaveBeenCalledWith(date);
  });
});
