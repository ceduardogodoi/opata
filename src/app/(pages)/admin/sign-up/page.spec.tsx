import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./page";

describe("pages / sign up", () => {
  let heading: HTMLHeadElement;
  let fullName: HTMLInputElement;
  let email: HTMLInputElement;
  let username: HTMLInputElement;
  let password: HTMLInputElement;
  let submit: HTMLButtonElement;
  let fullNameError: HTMLParagraphElement;
  let emailError: HTMLParagraphElement;
  let usernameError: HTMLParagraphElement;
  let passwordError: HTMLParagraphElement;

  it("Should render sign up page with correct contents", async () => {
    render(<SignUpPage />);

    heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 2,
      name: "Criar nova conta",
    });
    expect(heading).toHaveTextContent("Criar nova conta");

    fullName = screen.getByLabelText<HTMLInputElement>("Nome completo*");
    expect(fullName).toBeInTheDocument();

    email = screen.getByLabelText<HTMLInputElement>("E-mail*");
    expect(email).toBeInTheDocument();

    username = screen.getByLabelText<HTMLInputElement>("Usuário*");
    expect(username).toBeInTheDocument();

    password = screen.getByLabelText<HTMLInputElement>("Senha*");
    expect(password).toBeInTheDocument();

    submit = screen.getByRole<HTMLButtonElement>("button", {
      name: "Cadastre-se",
    });
    expect(submit).toBeInTheDocument();
  });

  it("Should have input errors shown when input data does not meet requirements", async () => {
    const user = userEvent.setup();

    await user.click(submit);

    fullNameError = screen.getByTestId<HTMLParagraphElement>("fullNameError");
    emailError = screen.getByTestId<HTMLParagraphElement>("emailError");
    usernameError = screen.getByTestId<HTMLParagraphElement>("usernameError");
    passwordError = screen.getByTestId<HTMLParagraphElement>("passwordError");

    expect(fullNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
