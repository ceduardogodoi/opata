import { describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { SignInRoute } from "./sign-in.route";
import { SignInUseCase } from "@/app/use-cases/users/sign-in/sign-in.use-case";
import type { SignInInputDto } from "@/app/use-cases/users/sign-in/sign-in.dto";
import { User } from "@/app/domain/user/entity/user";

vi.mock(import("next/headers"), async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...originalModule,
    cookies: vi.fn().mockResolvedValue({
      set: vi.fn().mockReturnValue({}),
    }),
  };
});

describe("routes / sign in user", () => {
  vi.stubEnv("JWT_SECRET", "jwt_secret");

  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );
  const signInUseCase = SignInUseCase.create(userRepository);
  const signInRoute = SignInRoute.create(signInUseCase);

  it("should not sign in when it is not found", async () => {
    const url = new URL("/api/users", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<SignInInputDto> => {
        return Promise.resolve({
          username: "jdoe",
          password: "cTF3MmUzcjQ=",
        });
      },
      url,
    } as Request;

    const response = await signInRoute.handle(request);
    expect(response.status).toBe(401);
  });

  it("should sign in when it is found, set access token in cookie, and an empty response body", async () => {
    const url = new URL("/api/users", "http://localhost:3000").toString();

    const user = await User.create({
      fullName: "John Doe",
      email: "john.doe@email.com",
      username: "jdoe",
      password: "cTF3MmUzcjQ=",
    });

    await userRepository.save(user);

    const request = {
      json: async (): Promise<SignInInputDto> => {
        return Promise.resolve({
          username: user.username,
          password: "cTF3MmUzcjQ=",
        });
      },
      url,
    } as Request;

    const response = await signInRoute.handle(request);
    expect(response.status).toBe(200);
  });
});
