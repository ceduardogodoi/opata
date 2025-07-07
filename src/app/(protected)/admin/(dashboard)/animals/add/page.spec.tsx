import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

    const dateOfBirth = screen.getByLabelText<HTMLButtonElement>(
      "Data de nascimento (Aproximada:)"
    );
    expect(dateOfBirth).toBeInTheDocument();
    expect(dateOfBirth).toHaveTextContent("01/01/2020");

    const history = screen.getByLabelText<HTMLInputElement>("História");
    expect(history).toBeInTheDocument();
    expect(history).toHaveValue("");

    const observations = screen.getByLabelText<HTMLInputElement>("Observações");
    expect(observations).toBeInTheDocument();
    expect(observations).toHaveValue("");

    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Cadastrar",
    });
    expect(addButton).toBeInTheDocument();
  });

  it("should show error messages when form is not properly filled out", async () => {
    const user = userEvent.setup();

    render(<AddAnimalPage />);

    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Cadastrar",
    });

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
    const dateOfBirth = screen.getByLabelText<HTMLButtonElement>(
      "Data de nascimento (Aproximada:)"
    );
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.click(dateOfBirth);
    const calendarDialog = await screen.findByRole<HTMLDivElement>("dialog");
    // OBSERVE: if this test will fail in the future
    const firstDayOfMonth = calendarDialog.querySelector<HTMLButtonElement>("button[data-day='7/1/2025']");
    await user.click(firstDayOfMonth!);

    const dateOfBirthText = screen.getByText<HTMLSpanElement>("01/07/2025");
    expect(dateOfBirthText).toBeInTheDocument();

    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Cadastrar",
    });

    await user.click(addButton);

    expect(addButton).toBeDisabled();
    expect(addButton).toHaveTextContent("Cadastrando...");
    expect(name).toBeDisabled();
    expect(dateOfBirth).toBeDisabled();
    expect(history).toBeDisabled();
    expect(observations).toBeDisabled();
  });

  it("should reset form after adding a new animal", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return Promise.resolve<Response>({
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
      })
    );

    render(<AddAnimalPage />);

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    const dateOfBirth = screen.getByLabelText<HTMLButtonElement>(
      "Data de nascimento (Aproximada:)"
    );
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.click(dateOfBirth);
    const calendarDialog = await screen.findByRole<HTMLDivElement>("dialog");
    // OBSERVE: if this test will fail in the future
    const firstDayOfMonth = calendarDialog.querySelector<HTMLButtonElement>("button[data-day='7/1/2025']");
    await user.click(firstDayOfMonth!);

    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Cadastrar",
    });

    await user.click(addButton);

    expect(name).toHaveValue("");
    expect(dateOfBirth).toHaveTextContent("01/01/2020");
    expect(history).toHaveValue("");
    expect(observations).toHaveValue("");
  });

  it("should show error message when response is not 201", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementationOnce(() => {
        return Promise.resolve<Response>({
          status: 400,
          json: async () => {
            return {};
          },
        } as Response);
      })
    );

    render(<AddAnimalPage />);

    const name = screen.getByLabelText<HTMLInputElement>("Nome*");
    const dateOfBirth = screen.getByLabelText<HTMLButtonElement>(
      "Data de nascimento (Aproximada:)"
    );
    const history = screen.getByLabelText<HTMLInputElement>("História");
    const observations = screen.getByLabelText<HTMLInputElement>("Observações");

    await user.type(name, "Bidu");
    await user.click(dateOfBirth);
    const calendarDialog = await screen.findByRole<HTMLDivElement>("dialog");
    const firstDayOfMonth = calendarDialog.querySelector<HTMLButtonElement>("button[data-day='7/1/2025']");
    await user.click(firstDayOfMonth!);

    await user.type(history, "Great dog");
    await user.type(observations, "Very friendly");

    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Cadastrar",
    });

    await user.click(addButton);

    const nameErrorMessage =
      screen.getByTestId<HTMLParagraphElement>("rootError");

    expect(nameErrorMessage).toBeInTheDocument();
  });
});
