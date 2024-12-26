import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import RootLayout from "./layout";
import { renderToStaticMarkup } from "react-dom/server";

describe("root layout", () => {
  it("should render the root layout", () => {
    const renderedHtml = renderToStaticMarkup(
      <RootLayout>
        <h1>Hello World</h1>
      </RootLayout>
    );
    document.body.innerHTML = renderedHtml;

    const h1 = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Hello World",
    });
    expect(h1).toBeInTheDocument();
  });
});
