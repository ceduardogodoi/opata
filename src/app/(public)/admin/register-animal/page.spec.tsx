import { cleanup, render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { beforeEach, expect, it, vi } from "vitest";
import RegisterAnimalPage from "./page";
import userEvent from "@testing-library/user-event";

describe("pages / register animal", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render page with main content", () => {
    render(<RegisterAnimalPage />);

    const heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Opata",
    });
    expect(heading).toBeInTheDocument();

    const heading2 = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 2,
      name: "Cadastrar novo animal",
    });
    expect(heading2).toBeInTheDocument();

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    expect(name).toBeInTheDocument();
    expect(name).toHaveValue("");

    const age = screen.getByLabelText<HTMLInputElement>("Idade");
    expect(age).toBeInTheDocument();
    expect(age).toHaveValue(null);

    const history = screen.getByLabelText<HTMLInputElement>("História");
    expect(history).toBeInTheDocument();
    expect(history).toHaveValue("");

    const observations = screen.getByLabelText<HTMLInputElement>("Observações");
    expect(observations).toBeInTheDocument();
    expect(observations).toHaveValue("");

    const registerButton = screen.getByRole<HTMLButtonElement>("button");
    expect(registerButton).toBeInTheDocument();
  });

  it("should show error messages when form is not properly filled out", async () => {
    const user = userEvent.setup();

    render(<RegisterAnimalPage />);

    const registerButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(registerButton);

    const nameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("nameError");

    expect(nameErrorMessage).toBeInTheDocument();
  });

  it("should register a new animal", async () => {
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
                  id: "7d78d3c6-f90c-4422-8252-339b8344392b",
                  name: "Bidu",
                  isAdopted: false,
                  age: 2,
                  history: "Great dog",
                  observations: "Very friendly",
                };
              },
            } as Response);
          }, 100);
        });
      })
    );

    render(<RegisterAnimalPage />);

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    const age = screen.getByLabelText<HTMLInputElement>("Idade");
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.type(age, "2");
    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const registerButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(registerButton);
    await user.click(registerButton);

    expect(registerButton).toBeDisabled();
    expect(registerButton).toHaveTextContent("Cadastrando...");
    expect(name).toBeDisabled();
    expect(age).toBeDisabled();
    expect(history).toBeDisabled();
    expect(observations).toBeDisabled();
  });
});
