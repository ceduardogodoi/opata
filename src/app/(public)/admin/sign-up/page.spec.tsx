import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRouter, useSearchParams } from "next/navigation";
import SignUpPage from "./page";

vi.mock(import("next/navigation"), async (originalImport) => {
  const originalModule = await originalImport();

  return {
    ...originalModule,
    useRouter: vi.fn().mockReturnValue({
      push: vi.fn(),
    }),
    useSearchParams: vi.fn().mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    }),
  };
});

describe("pages / sign up", () => {
  beforeEach(() => {
    cleanup();

    vi.unstubAllGlobals();
  });

  it("should render page with main content", () => {
    render(<SignUpPage />);

    const heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Opata",
    });
    expect(heading).toBeInTheDocument();

    const heading2 = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 2,
      name: "Criar nova conta",
    });
    expect(heading2).toBeInTheDocument();

    const fullName = screen.getByLabelText<HTMLInputElement>("Nome completo*");
    expect(fullName).toBeInTheDocument();
    expect(fullName).toHaveValue("");

    const username = screen.getByLabelText<HTMLInputElement>("Usuário*");
    expect(username).toBeInTheDocument();
    expect(username).toHaveValue("");

    const email = screen.getByLabelText<HTMLInputElement>("E-mail*");
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue("");

    const password = screen.getByLabelText<HTMLInputElement>("Senha*");
    expect(password).toBeInTheDocument();
    expect(password).toHaveValue("");

    const signUpButton = screen.getByRole<HTMLButtonElement>("button");
    expect(signUpButton).toBeInTheDocument();
  });

  it("should show error messages when form is not properly filled out", async () => {
    const user = userEvent.setup();

    render(<SignUpPage />);

    const signUpButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(signUpButton);

    const fullNameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("fullNameError");
    const usernameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("usernameError");
    const emailErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("emailError");
    const passwordErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("passwordError");

    expect(fullNameErrorMessage).toBeInTheDocument();
    expect(usernameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it("should sign-up user and redirect it to /admin/sign-in", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return new Promise<Response>((resolve) => {
          // need to have a delay
          // to catch form submitting state
          setTimeout(() => {
            resolve({
              status: 201,
              json: async () => {
                return {
                  id: "011760f0-1812-405c-9e17-39da18cac5aa",
                  fullName: "John Doe",
                  email: "jdoe@gmail.com",
                  username: "jdoe",
                  createdAt: "2025-02-20T15:12:13.651Z",
                  updatedAt: "2025-02-20T15:12:13.651Z",
                };
              },
            } as Response);
          }, 100);
        });
      })
    );

    const mockRouterPush = vi.fn();
    const mockUseRouter = vi.mocked(useRouter, {
      partial: true,
    });
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    render(<SignUpPage />);

    const fullName = screen.getByLabelText<HTMLInputElement>("Nome completo*");
    const username = screen.getByLabelText<HTMLInputElement>("Usuário*");
    const email = screen.getByLabelText<HTMLInputElement>("E-mail*");
    const password = screen.getByLabelText<HTMLInputElement>("Senha*");

    await user.type(fullName, "John Doe");
    await user.type(username, "jdoe");
    await user.type(email, "jdoe@gmail.com");
    await user.type(password, "q1w2e3r4");

    const signUpButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(signUpButton);
    await user.click(signUpButton);

    expect(signUpButton).toBeDisabled();
    expect(signUpButton).toHaveTextContent("Criando sua conta...");
    expect(fullName).toBeDisabled();
    expect(username).toBeDisabled();
    expect(email).toBeDisabled();
    expect(password).toBeDisabled();

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/admin/sign-in?username=jdoe"
      );
    });
  });

  it("should show submission error when signing up duplicate username", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 409,
      })
    );

    render(<SignUpPage />);

    const fullName = screen.getByLabelText<HTMLInputElement>("Nome completo*");
    const username = screen.getByLabelText<HTMLInputElement>("Usuário*");
    const email = screen.getByLabelText<HTMLInputElement>("E-mail*");
    const password = screen.getByLabelText<HTMLInputElement>("Senha*");

    await user.type(fullName, "John Doe");
    await user.type(username, "jdoe");
    await user.type(email, "jdoe@gmail.com");
    await user.type(password, "q1w2e3r4");

    const signUpButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(signUpButton);

    const usernameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("usernameError");

    expect(usernameErrorMessage).toBeInTheDocument();
    expect(usernameErrorMessage).toHaveTextContent("Usuário já existe.");
  });

  it("should render filled out form when query param mock=filled is present", () => {
    const mockUseSearchParams = vi.mocked(useSearchParams, {
      partial: true,
    });
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue("filled"),
    });

    const url = new URL("/admin/sign-up", "http://localhost:3000");
    url.searchParams.set("mock", "filled");

    vi.stubGlobal(window.location.href, url.href);

    render(<SignUpPage />);

    const fullName = screen.getByLabelText<HTMLInputElement>("Nome completo*");
    const username = screen.getByLabelText<HTMLInputElement>("Usuário*");
    const email = screen.getByLabelText<HTMLInputElement>("E-mail*");
    const password = screen.getByLabelText<HTMLInputElement>("Senha*");

    expect(fullName).toHaveValue("John Doe");
    expect(username).toHaveValue("jdoe");
    expect(email).toHaveValue("jdoe@gmail.com");
    expect(password).toHaveValue("q1w2e3r4");
  });
});
