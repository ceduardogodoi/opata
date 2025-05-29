import { describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";
import { renderToString } from "react-dom/server";

vi.mock("next/font/google", () => ({
  Baloo_2: vi.fn().mockReturnValue({
    variable: "font-baloo2",
  }),
  Quicksand: vi.fn().mockReturnValue({
    variable: "font-quicksand",
  }),
}));

describe("Layout", () => {
  it("should render the layout", () => {
    const htmlString = renderToString(
      <RootLayout>
        <h1>Opata | Joaquim Távora</h1>
      </RootLayout>
    );
    expect(htmlString).toContain("Opata | Joaquim Távora");
  });
});
