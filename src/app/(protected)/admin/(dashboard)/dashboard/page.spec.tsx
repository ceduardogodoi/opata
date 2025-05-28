import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DashboardPage from "./page";

describe("pages / dashboard", () => {
  it("should render dashboard with all its contents", () => {
    render(<DashboardPage />);

    const heading = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
    });

    expect(heading).toHaveTextContent("Dashboard Page");
  });
});
