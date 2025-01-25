import { describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";
import { container } from "tsyringe";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { createUserFixture } from "@/app/fixtures/user.fixture";
import { User } from "@/app/domain/user/entity/user";
import { UUID_REGEX } from "@/app/globals/constants";
import { SignUpUseCase } from "./sign-up.usecase";

describe("use-cases / create user", () => {
  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  it("should create a user and confirm its data", async () => {
    const mockDate = new Date(2025, 0, 22, 0, 0, 0, 0);
    vi.setSystemTime(mockDate);

    const signUpUseCase = SignUpUseCase.create(userRepository);
    const user = await signUpUseCase.execute(createUserFixture);
    const passwordMatch = await bcrypt.compare(
      createUserFixture.password,
      user.passwordHash
    );

    expect(user).toBeInstanceOf(User);
    expect(user.id).toMatch(UUID_REGEX);
    expect(user.fullName).toBe(createUserFixture.fullName);
    expect(user.username).toBe("jdoe");
    expect(user.email).toBe(createUserFixture.email);
    expect(passwordMatch).toBe(true);
    expect(user.createdAt).toEqual(mockDate);
    expect(user.updatedAt).toEqual(mockDate);

    vi.useRealTimers();
  });

  it.each([
    { property: "fullName", message: "Full name is required." },
    { property: "email", message: "Email is required." },
    { property: "password", message: "Password is required." },
    {
      property: "password",
      message: "Password should have a minimum of 4 characters long.",
      value: "abc",
    },
  ])(
    "should throw when trying to create a user with invalid property $property",
    async ({ property, message, value }) => {
      const signUpUseCase = SignUpUseCase.create(userRepository);

      const fixture = Object.create(createUserFixture, {
        [property]: {
          value,
        },
      });

      await expect(() => signUpUseCase.execute(fixture)).rejects.toMatchObject({
        detail: `Input with invalid value for field(s): ${property}`,
        fields: {
          [property]: [message],
        },
      });
    }
  );
});
