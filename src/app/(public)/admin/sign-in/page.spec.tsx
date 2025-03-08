import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { container } from "tsyringe";
import { useRouter, useSearchParams } from "next/navigation";
import SignInPage from "./page";
import type { UserRepositoryGateway } from "@/app/domain/user/gateway/user-repository.gateway.interface";
import { User } from "@/app/domain/user/entity/user";
import { InvalidCredentialsError } from "@/app/infra/http/errors/invalid-credentials/invalid-credentials";

vi.mock(import("next/navigation"), async (originalImport) => {
  const originalModule = await originalImport();

  return {
    ...originalModule,
    useSearchParams: vi.fn().mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    }),
    useRouter: vi.fn().mockReturnValue({
      push: vi.fn().mockReturnValue(undefined),
    }),
  };
});

describe("pages / sign in", () => {
  beforeEach(() => {
    cleanup();

    vi.unstubAllGlobals();
  });

  it("should render page with main content", () => {
    render(<SignInPage />);

    const heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Autenticar",
    });
    expect(heading).toBeInTheDocument();

    const username = screen.getByLabelText<HTMLInputElement>("Usuário*");
    expect(username).toBeInTheDocument();
    expect(username).toHaveValue("");

    const password = screen.getByLabelText<HTMLInputElement>("Senha*");
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue("");

    const signInButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Entrar",
    });
    expect(signInButton).toBeInTheDocument();
  });

  it("should render page with username field filled out when present", () => {
    const username = "jdoe";

    const mockUseSearchParams = vi.mocked(useSearchParams, {
      partial: true,
    });
    mockUseSearchParams.mockReturnValueOnce({
      get: vi.fn().mockReturnValueOnce(username),
    });

    render(<SignInPage />);

    const usernameInput = screen.getByLabelText<HTMLInputElement>("Usuário*");
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveValue(username);
  });

  it("should sign in when entering valid credentials", async () => {
    const userRepository = container.resolve<UserRepositoryGateway>(
      "UserRepositoryGateway"
    );

    const userInstance = await User.create({
      fullName: "John Doe",
      email: "jdoe@email.com",
      username: "jdoe",
      password: "q1w2e3r4",
    });

    await userRepository.save(userInstance);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return new Promise<Response>((resolve) => {
          // need to have a delay
          // to catch form submitting state
          setTimeout(() => {
            resolve({
              status: 200,
              json: async () => {
                return {
                  accessToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2ODQwZmI0LTQ1NjUtNDZiMS05YTk1LTEyNjc1Yzk5NGQ3NyIsImZ1bGxOYW1lIjoiSm9obiBEb2UiLCJ1c2VybmFtZSI6Impkb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGVtYWlsLmNvbSIsImlhdCI6MTc0MTIxODg0MSwiZXhwIjoxNzQxMjIyNDQxfQ.kQB7X6IioIZTb6sQNPqTgtYpWn9ab72aKmf7WqZJ9MY",
                };
              },
            } as Response);
          }, 100);
        });
      })
    );

    const user = userEvent.setup();

    const mockRouterPush = vi.fn().mockReturnValueOnce(undefined);
    const mockUseRouter = vi.mocked(useRouter, {
      partial: true,
    });
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    render(<SignInPage />);

    const usernameInput = screen.getByLabelText<HTMLInputElement>("Usuário*");
    await user.type(usernameInput, "jdoe");

    const passwordInput = screen.getByLabelText<HTMLInputElement>("Senha*");
    await user.type(passwordInput, "q1w2e3r4");

    const signInButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Entrar",
    });
    await user.click(signInButton);

    expect(signInButton).toBeDisabled();
    expect(signInButton).toHaveTextContent("Autenticando...");
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should render error message when entering invalid credentials", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return new Promise<Response>((resolve) => {
          // need to have a delay
          // to catch form submitting state
          setTimeout(() => {
            resolve({
              status: 401,
              json: async () => {
                return {
                  type: "https://example.com/probs/invalid-credentials",
                  title: "Username or password are invalid.",
                  detail:
                    "You entered invalid credentials, please enter valid credentials.",
                  instance: "/api/sign-in",
                } as InvalidCredentialsError;
              },
            } as Response);
          }, 100);
        });
      })
    );

    const user = userEvent.setup();

    render(<SignInPage />);

    const usernameInput = screen.getByLabelText<HTMLInputElement>("Usuário*");
    await user.type(usernameInput, "jdoe");

    const passwordInput = screen.getByLabelText<HTMLInputElement>("Senha*");
    await user.type(passwordInput, "q1w2e3r");

    const signInButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Entrar",
    });
    await user.click(signInButton);

    expect(signInButton).toBeDisabled();
    expect(signInButton).toHaveTextContent("Autenticando...");
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();

    const invalidCredentialsErrorText =
      await screen.findByTestId<HTMLParagraphElement>(
        "invalidCredentialsError"
      );
    expect(invalidCredentialsErrorText).toBeInTheDocument();

    expect(signInButton).toHaveTextContent("Entrar");
  });
});
