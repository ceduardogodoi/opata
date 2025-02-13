import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { SignInInputDto } from "@/app/use-cases/users/sign-in/sign-in.dto";
import { container } from "tsyringe";
import { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { User } from "@/app/domain/user/entity/user";
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

describe("POST /users - sign in", () => {
  vi.stubEnv("JWT_SECRET", "jwt_secret");

  const userRepository = container.resolve<UserRepositoryGateway>(
    "UserRepositoryGateway"
  );

  it("should not sign-in since the user does not exist", async () => {
    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const request = {
      json: async (): Promise<SignInInputDto> => {
        return Promise.resolve({
          username: "jdoe",
          password: "q1w2e3r4",
        });
      },
      url,
    } as Request;

    const response = await POST(request);
    expect(response.status).toBe(404);
  });

  it("should sign-in a user", async () => {
    const user = await User.create({
      fullName: "John Doe",
      username: "jdoe",
      email: "john.doe@email.com",
      password: "q1w2e3r4",
    });
    await userRepository.save(user);

    const url = new URL("/api/animals", "http://localhost:3000").toString();

    const cookieStore = await cookies();
    const cookieStoreSetSpy = vi.spyOn(cookieStore, "set");

    const request = {
      json: async (): Promise<SignInInputDto> => {
        return Promise.resolve({
          username: "jdoe",
          password: "q1w2e3r4",
        });
      },
      url,
    } as Request;

    const response = await POST(request);
    const output = await response.json();
    expect(output.accessToken).toBeTypeOf("string");

    expect(cookieStoreSetSpy).toHaveBeenCalledWith(
      "access_token",
      output.accessToken,
      {
        secure: false,
        httpOnly: false,
      }
    );
  });
});
