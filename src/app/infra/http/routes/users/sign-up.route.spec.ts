import { describe, it, expect, vi, afterEach } from "vitest";
import { container } from "tsyringe";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { SignUpUseCase } from "@/app/use-cases/users/sign-up/sign-up.usecase";
import type { CreateUserInputDto } from "@/app/use-cases/users/sign-up/sign-up.dto";
import { UUID_REGEX } from "@/app/globals/constants";
import { SignUpRoute } from "./sign-up.route";
import { SignUpPresentOutput } from "../../presenters/users/sign-up.presenter.dto";
import { cookies } from "next/headers";

vi.mock(import("next/headers"), async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...originalModule,
    cookies: vi.fn().mockResolvedValue({
      set: vi.fn().mockReturnValue({}),
    }),
  };
});

describe("routes / sign up user", () => {
  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );
  const signUpUseCase = SignUpUseCase.create(userRepository);
  const signUpRoute = SignUpRoute.create(signUpUseCase);

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should sign up a new user", async () => {
    const mockDate = new Date(2025, 0, 25, 0, 0, 0, 0);
    const mockDateISO = mockDate.toISOString();
    vi.setSystemTime(mockDate);

    const url = new URL("/api/users", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<CreateUserInputDto> => {
        return Promise.resolve({
          fullName: "John Doe",
          email: "johndoe@email.com",
          username: "jdoe",
          password: "cTF3MmUzcjQ=",
        });
      },
      url,
    } as Request;

    const cookieStore = await cookies();
    const cookieSetSpy = vi.spyOn(cookieStore, "set");

    const response = await signUpRoute.handle(request);
    const output: SignUpPresentOutput = await response.json();

    expect(cookieSetSpy).not.toHaveBeenCalled();

    expect(response.status).toBe(201);
    expect(output.id).toMatch(UUID_REGEX);
    expect(output.fullName).toBe("John Doe");
    expect(output.email).toBe("johndoe@email.com");
    expect(output.username).toBe("jdoe");
    expect(output).not.toHaveProperty("passwordHash");
    expect(output.createdAt).toBe(mockDateISO);
    expect(output.updatedAt).toBe(mockDateISO);
  });
});
