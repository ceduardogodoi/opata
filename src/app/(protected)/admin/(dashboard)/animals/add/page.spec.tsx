import { cleanup, render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { beforeEach, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import AddAnimalPage from "./page";

describe("pages / add animals", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render page with main content", () => {
    render(<AddAnimalPage />);

    const heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 2,
      name: "Cadastrar novo animal",
    });
    expect(heading).toBeInTheDocument();

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    expect(name).toBeInTheDocument();
    expect(name).toHaveValue("");

    const age = screen.getByLabelText<HTMLInputElement>("Idade");
    expect(age).toBeInTheDocument();
    expect(age).toHaveValue(0);

    const history = screen.getByLabelText<HTMLInputElement>("História");
    expect(history).toBeInTheDocument();
    expect(history).toHaveValue("");

    const observations = screen.getByLabelText<HTMLInputElement>("Observações");
    expect(observations).toBeInTheDocument();
    expect(observations).toHaveValue("");

    const addButton = screen.getByRole<HTMLButtonElement>("button");
    expect(addButton).toBeInTheDocument();
  });

  it("should show error messages when form is not properly filled out", async () => {
    const user = userEvent.setup();

    render(<AddAnimalPage />);

    const addButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(addButton);

    const nameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("nameError");

    expect(nameErrorMessage).toBeInTheDocument();
  });

  it("should add a new animal", async () => {
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

    render(<AddAnimalPage />);

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    const age = screen.getByLabelText<HTMLInputElement>("Idade");
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.type(age, "2");
    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const addButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(addButton);

    expect(addButton).toBeDisabled();
    expect(addButton).toHaveTextContent("Cadastrando...");
    expect(name).toBeDisabled();
    expect(age).toBeDisabled();
    expect(history).toBeDisabled();
    expect(observations).toBeDisabled();
  });

  it("should reset form after adding a new animal", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return new Promise<Response>((resolve) => {
          // need to have a delay
          // to catch form submitting state
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
        });
      })
    );

    render(<AddAnimalPage />);

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    const age = screen.getByLabelText<HTMLInputElement>("Idade");
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.type(age, "2");
    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const addButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(addButton);

    expect(name).toHaveValue("");
    expect(age).toHaveValue(0);
    expect(history).toHaveValue("");
    expect(observations).toHaveValue("");
  });

  it("should show error message when response is not 201", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return new Promise<Response>((resolve) => {
          // need to have a delay
          // to catch form submitting state
          resolve({
            status: 400,
            json: async () => {
              return {};
            },
          } as Response);
        });
      })
    );

    render(<AddAnimalPage />);

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    const age = screen.getByLabelText<HTMLInputElement>("Idade");
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.type(age, "2");
    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const addButton = screen.getByRole<HTMLButtonElement>("button");

    await user.click(addButton);

    const nameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("rootError");

    expect(nameErrorMessage).toBeInTheDocument();
  });
});
