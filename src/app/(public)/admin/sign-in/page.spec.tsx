import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SignInPage from "./page";

describe("pages / sign in", () => {
  it("should render page with main content", () => {
    render(<SignInPage />);

    const heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Entrar",
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
});
