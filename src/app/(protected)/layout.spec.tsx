import { describe, expect, it } from "vitest";
import ProtectedLayout from "./layout";
import { renderToString } from "react-dom/server";

describe("protected layout", () => {
  it("should render the protected layout", () => {
    const htmlString = renderToString(
      <ProtectedLayout>
        <h1>Opata | Joaquim Távora</h1>
      </ProtectedLayout>
    );

    expect(htmlString).toContain("Opata | Joaquim Távora");
  });
});
