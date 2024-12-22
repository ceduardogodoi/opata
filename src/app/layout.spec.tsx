import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

describe("root layout", () => {
  it("should render the root layout", () => {
    render(
      <RootLayout>
        <h1>Hello World</h1>
      </RootLayout>
    );

    const h1 = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Hello World",
    });
    expect(h1).toBeInTheDocument();
  });
});
