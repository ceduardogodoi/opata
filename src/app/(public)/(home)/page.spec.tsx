import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render the hero section with correct content", () => {
    render(<Home />);

    expect(screen.getByText("Dê um Lar para Quem Precisa")).toBeInTheDocument();
    expect(
      screen.getByText("Transforme vidas através da adoção responsável")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Conheça Nossos Animais" })
    ).toBeInTheDocument();
  });

  it("should render the about section with correct content", () => {
    render(<Home />);

    expect(screen.getByText("Sobre Nós")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Saiba Mais" })
    ).toBeInTheDocument();
  });

  it("should render the how to help section with correct content", () => {
    render(<Home />);

    expect(screen.getByText("Como Ajudar")).toBeInTheDocument();
    expect(screen.getByText("Adote")).toBeInTheDocument();
  });

  it("should render all images with correct alt text", () => {
    render(<Home />);

    expect(
      screen.getByAltText("Cachorro e gato juntos demonstrando amizade")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Cachorros e gatos fofos esperando por um lar")
    ).toBeInTheDocument();
  });
});
