import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdminLayout from "./layout";

describe("admin layout", () => {
  it("should render the admin layout", () => {
    render(
      <AdminLayout>
        <h1>Hello World</h1>
      </AdminLayout>
    );

    const h1 = screen.getByRole<HTMLHeadingElement>("heading", {
      level: 1,
      name: "Hello World",
    });
    expect(h1).toBeInTheDocument();
  });
});
