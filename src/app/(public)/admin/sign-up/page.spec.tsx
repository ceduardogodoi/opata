import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SignUpPage from "./page";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";

vi.mock(import("next/navigation"), async (originalImport) => {
  const originalModule = await originalImport();
  return {
    ...originalModule,
    useRouter: vi.fn(),
  };
});

describe("pages / sign up", () => {
  beforeEach(() => {
    cleanup();

    vi.unstubAllGlobals();
    vi.restoreAllMocks();
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
      vi.fn().mockResolvedValue({
        status: 201,
      })
    );

    const mockRouterPush = vi.fn();
    const mockUseRouter = vi.mocked(useRouter);
    mockUseRouter.mockReturnValue({
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      push: mockRouterPush,
    });

    render(<SignUpPage />);

    const fullName =
      screen.getByLabelText<HTMLHeadingElement>("Nome completo*");
    const username = screen.getByLabelText<HTMLHeadingElement>("Usuário*");
    const email = screen.getByLabelText<HTMLHeadingElement>("E-mail*");
    const password = screen.getByLabelText<HTMLHeadingElement>("Senha*");

    await user.type(fullName, "John Doe");
    await user.type(username, "jdoe");
    await user.type(email, "jdoe@gmail.com");
    await user.type(password, "q1w2e3r4");

    const signUpButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(signUpButton);
    await user.click(signUpButton);

    // expect(signUpButton).toBeDisabled();
    // expect(signUpButton).toHaveTextContent("Criando sua conta...");

    expect(mockRouterPush).toHaveBeenCalledWith("/admin/sign-in");
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

    const fullName =
      screen.getByLabelText<HTMLHeadingElement>("Nome completo*");
    const username = screen.getByLabelText<HTMLHeadingElement>("Usuário*");
    const email = screen.getByLabelText<HTMLHeadingElement>("E-mail*");
    const password = screen.getByLabelText<HTMLHeadingElement>("Senha*");

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
});
