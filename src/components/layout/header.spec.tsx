import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Header, navLinks } from "./header";
import userEvent from "@testing-library/user-event";

describe("components / header", () => {
  beforeEach(() => {
    cleanup();
  });

  it.each(navLinks)(
    "should render the header with $label nav link",
    ({ label, href }) => {
      render(<Header />);

      const navLinks = screen.getAllByRole<HTMLAnchorElement>("link", {
        name: label,
      });

      navLinks.forEach((link) => {
        expect(link).toHaveAttribute("href", href);
      });
    }
  );

  it("should open and close the mobile menu when in mobile view", async () => {
    const user = userEvent.setup();

    render(<Header />);

    const hambugerMenu = screen.getByTitle<HTMLButtonElement>("Abrir menu");
    await user.click(hambugerMenu);

    const nav = screen.getByTestId<HTMLElement>("@mobile");

    expect(nav).toBeInTheDocument();

    await user.click(hambugerMenu);

    expect(nav).not.toBeInTheDocument();
  });

  it("should close the mobile menu when navigating to another route", async () => {
    const user = userEvent.setup();

    render(<Header />);

    const hambugerMenu = screen.getByTitle<HTMLButtonElement>("Abrir menu");
    await user.click(hambugerMenu);

    const nav = screen.getByTestId<HTMLElement>("@mobile");

    const mobileHomeLink = screen.getByTestId<HTMLAnchorElement>("@mobile/");
    await user.click(mobileHomeLink);

    expect(nav).not.toBeInTheDocument();
  });
});
