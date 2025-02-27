import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSearchParams } from "next/navigation";
import SignInPage from "./page";

vi.mock(import("next/navigation"), async (originalImport) => {
  const originalModule = await originalImport();

  return {
    ...originalModule,
    useSearchParams: vi.fn().mockReturnValue({
      get: vi.fn().mockReturnValue(null),
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
});
