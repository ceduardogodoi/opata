import { describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import jwt from "jsonwebtoken";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { createUserFixture } from "@/app/fixtures/user.fixture";
import { User } from "@/app/domain/user/entity/user";
import type { SignInInputDto } from "./sign-in.dto";
import { SignInUseCase } from "./sign-in.use-case";
import { JwtService } from "@/app/infra/security/jwt-service";

describe("use-cases / sign in user", () => {
  vi.stubEnv("JWT_SECRET", "jwt_secret");

  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  const signInUseCase = SignInUseCase.create(userRepository);

  it("should sign in a user", async () => {
    const newUser = await User.create(createUserFixture);

    await userRepository.save(newUser);

    const credentials: SignInInputDto = {
      username: createUserFixture.username,
      password: createUserFixture.password,
    };

    const jwtSignSpy = vi.spyOn(jwt, "sign");

    const token = await signInUseCase.execute(credentials);
    expect(jwtSignSpy.mock.calls[0]).toStrictEqual([
      {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
      },
      "jwt_secret",
      { expiresIn: "1h" },
    ]);
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

    const payload = JwtService.decode(token);

    const currentTime = Date.now();
    expect(payload.exp < currentTime);

    vi.useRealTimers();
  });
});
