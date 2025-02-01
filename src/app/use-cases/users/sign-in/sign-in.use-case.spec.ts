import { assert, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import jwt from "jsonwebtoken";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { createUserFixture } from "@/app/fixtures/user.fixture";
import { User } from "@/app/domain/user/entity/user";
import type { SignInInputDto } from "./sign-in.dto";
import { SignInUseCase } from "./sign-in.use-case";

describe("use-cases / sign in user", () => {
  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  const signInUseCase = SignInUseCase.create(userRepository);

  vi.stubEnv("JWT_SECRET", "jwt_secret");

  it("should sign in a user", async () => {
    const newUser = await User.create(createUserFixture);

    await userRepository.save(newUser);

    const credentials: SignInInputDto = {
      username: createUserFixture.username,
      password: createUserFixture.password,
    };

    const token = await signInUseCase.execute(credentials);
    expect(token).toBeDefined();
    expect(token).toBeTypeOf("string");
  });

  it.each([
    {
      username: "wrong",
      password: createUserFixture.password,
      invalidField: "username",
    },
    {
      username: createUserFixture.username,
      password: "wrong",
      invalidField: "password",
    },
  ])(
    "should throw when field $invalidField is invalid",
    async ({ username, password }) => {
      const credentials: SignInInputDto = {
        username,
        password,
      };

      await expect(() =>
        signInUseCase.execute(credentials)
      ).rejects.toThrowError();
    }
  );

  it("should expire a user after one hour", async () => {
    vi.useFakeTimers();

    const credentials: SignInInputDto = {
      username: createUserFixture.username,
      password: createUserFixture.password,
    };

    const token = await signInUseCase.execute(credentials);

    // Advance time in one hour and one second
    vi.advanceTimersByTime(3600 * 1000 + 1000);

    // TODO: Create a especialized class for this
    const payload = jwt.decode(token);
    if (payload == null || typeof payload === "string") {
      assert.fail("Payload is not valid.");
    }

    if (payload.exp == null) {
      assert.fail("Payload expiration is undefined.");
    }

    const currentTime = Date.now();
    expect(payload.exp < currentTime);

    vi.useRealTimers();
  });
});
