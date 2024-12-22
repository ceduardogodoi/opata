import { describe, expect, it } from "vitest";
import Page from "./page";
import { render, screen } from "@testing-library/react";

describe("root page", () => {
  it("should render the root page", () => {
    render(<Page />);

    const h1 = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Hello World",
    });
    expect(h1).toBeInTheDocument();
  });
});
