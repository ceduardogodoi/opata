import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("components / footer", () => {
  it("should render the footer with social media, contacts and current year", () => {
    render(<Footer />);

    const facebookLink =
      screen.getByTitle<HTMLAnchorElement>("Ir para Facebook");

    const instagramLink =
      screen.getByTitle<HTMLAnchorElement>("Ir para Instagram");

    const whatsAppLink = screen.getByTitle<HTMLAnchorElement>(
      "Conversar pelo WhatsApp"
    );

    const emailLink = screen.getByTitle<HTMLAnchorElement>(
      "Entrar em contato via email"
    );

    const yearElement = screen.getByRole<HTMLTimeElement>("time");
    const currentYear = new Date().getFullYear().toString();

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(whatsAppLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
    expect(yearElement).toHaveAttribute("datetime", currentYear);
  });
});
