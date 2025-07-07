import bcrypt from "bcrypt";
import { describe, expect, it, vi } from "vitest";
import { User } from "./user";
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

  it("should be able to a update user's data", () => {
    const user = User.with(userFixture);

    const newData = {
      fullName: "Jane Doe",
      email: "jane.doe@email.com",
      username: "janedoe",
    };

    user.update({
      fullName: newData.fullName,
      email: newData.email,
      username: newData.username,
    });

    expect(user.fullName).toBe("Jane Doe");
    expect(user.email).toBe("jane.doe@email.com");
    expect(user.username).toBe("janedoe");
    expect(user.createdAt).toEqual(userFixture.createdAt);
    expect(user.updatedAt).not.toEqual(userFixture.updatedAt);
  });
});
