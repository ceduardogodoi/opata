import { describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { User } from "@/app/domain/user/entity/user";
import { createUserFixture } from "@/app/fixtures/user.fixture";
import { FindByUsernameUseCase } from "./find-by-username.use-case";
import { InputValidationError } from "@/app/infra/http/errors/input-validation/input-validation.error";
import { NoResourcesFoundError } from "@/app/infra/http/errors/no-resources-found/no-resources-found.error";

describe("use-cases / create user", () => {
  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  const findByUsernameUseCase = FindByUsernameUseCase.create(userRepository);

  it("should find a user by its username", async () => {
    const mockDate = new Date(2025, 0, 31, 0, 0, 0, 0);
    vi.setSystemTime(mockDate);

    const newUser = await User.create(createUserFixture);

    await userRepository.save(newUser);

    const user = await findByUsernameUseCase.execute(newUser.username);
    expect(user).toBeInstanceOf(User);
    expect(user).toStrictEqual(
      expect.objectContaining({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        username: newUser.username,
        createdAt: mockDate,
        updatedAt: mockDate,
      })
    );

    vi.useRealTimers();
  });

  it("should throw when username input is invalid", async () => {
    await expect(() => findByUsernameUseCase.execute("x")).rejects.toThrowError(
      InputValidationError
    );
  });

  it("should throw when username input is valid, but no user was found", async () => {
    await expect(() =>
      findByUsernameUseCase.execute("xpto")
    ).rejects.toThrowError(NoResourcesFoundError);
  });
});
