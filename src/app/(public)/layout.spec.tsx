import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PublicLayout from "./layout";

describe("PublicLayout", () => {
  it("should render header, main content and footer", () => {
    render(
      <PublicLayout>
        <div>Test Content</div>
      </PublicLayout>
    );

    // Check if header is rendered
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Check if main content is rendered
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    // Check if footer is rendered
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should render children content correctly", () => {
    const testContent = "Custom Test Content";
    render(
      <PublicLayout>
        <div>{testContent}</div>
      </PublicLayout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
