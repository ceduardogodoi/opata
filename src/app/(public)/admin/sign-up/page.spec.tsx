import { afterEach, describe, expect, it, vi } from "vitest";
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should render sign up page with correct contents", () => {
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

  it("Should have input fields filled out correctly", async () => {
    const user = userEvent.setup();

    await user.type(fullName, "John Doe");
    await user.type(username, "jdoe");
    await user.type(email, "jdoe@email.com");
    await user.type(password, "q1w2e3r4");

    expect(fullNameError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    expect(usernameError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();

    expect(fullName).toHaveValue("John Doe");
    expect(username).toHaveValue("jdoe");
    expect(email).toHaveValue("jdoe@email.com");
    expect(password).toHaveValue("q1w2e3r4");
  });

  it("Should have submitted data to sign up", async () => {
    const user = userEvent.setup();

    const fetchSpy = vi.spyOn(global, "fetch");

    await user.click(submit);

    expect(submit.textContent).toBe("Criando sua conta...");
    expect(submit).toBeDisabled();

    expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/api/sign-up", {
      method: "POST",
      body: JSON.stringify({
        fullName: "John Doe",
        email: "jdoe@email.com",
        username: "jdoe",
        password: "q1w2e3r4",
      }),
    });
  });
});
