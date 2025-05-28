import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import DashboardLayout from "./layout";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe("DashboardLayout", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    cleanup();

    // Default pathname mock
    vi.mocked(usePathname).mockReturnValue("/admin/dashboard");
  });

  it("should render the layout with navigation title", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText("Navegação")).toBeInTheDocument();
  });

  it("should render all navigation links", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Animais")).toBeInTheDocument();
    expect(screen.getByText("Usuários")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("should toggle mobile menu when menu button is clicked", async () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    const menuButton = screen.getByLabelText<HTMLButtonElement>("Toggle menu");
    const mobileMenu = screen.getByTestId<HTMLDivElement>("mobile-sidebar");

    // Menu should be hidden by default on mobile
    expect(mobileMenu).toHaveClass("-translate-x-full");

    // Click menu button
    await user.click(menuButton);

    // Menu should be visible
    expect(mobileMenu).toHaveClass("translate-x-0");

    // Click menu button again
    await user.click(menuButton);

    // Menu should be hidden again
    expect(mobileMenu).toHaveClass("-translate-x-full");
  });

  it("should close mobile menu when clicking backdrop", async () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    const menuButton = screen.getByLabelText<HTMLButtonElement>("Toggle menu");
    const mobileMenu = screen.getByTestId<HTMLDivElement>("mobile-sidebar");

    // Open menu
    await user.click(menuButton);
    expect(mobileMenu).toHaveClass("translate-x-0");

    // Click backdrop
    const backdrop = screen.getByTestId<HTMLDivElement>("mobile-backdrop");
    await user.click(backdrop);

    // Menu should be hidden
    expect(mobileMenu).toHaveClass("-translate-x-full");
  });

  it("should highlight active navigation link", () => {
    vi.mocked(usePathname).mockReturnValue("/admin/animals");

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    const activeLink = screen.getByText("Animais").closest("button");
    expect(activeLink).toHaveClass("text-white bg-opata-green");
  });

  it("should render children content", () => {
    render(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>
    );

    const content = screen.getByTestId<HTMLDivElement>("test-content");
    expect(content).toBeInTheDocument();
  });

  it("should close mobile menu when clicking a navigation link", async () => {
    const push = vi.fn();
    vi.mocked(useRouter, { partial: true }).mockReturnValue({
      push,
    });

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    const dashboardLink = screen.getByRole<HTMLButtonElement>("button", {
      name: "Dashboard",
    });

    await user.click(dashboardLink);

    expect(push).toHaveBeenCalledWith("/admin/dashboard");

    const mobileMenu = screen.getByTestId<HTMLDivElement>("mobile-sidebar");
    expect(mobileMenu).toHaveClass("-translate-x-full");
  });
});
