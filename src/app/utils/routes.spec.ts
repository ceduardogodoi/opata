import { describe, it, expect } from "vitest";
import { isAuthRoute, isProtectedRoute, isPublicRoute } from "./routes";

describe("utils / routes", () => {
  it.each([
    {
      pathname: "/admin/sign-up",
      expectation: true,
      message: "is a valid auth route",
    },
    {
      pathname: "/admin/sign-in",
      expectation: true,
      message: "is a valid auth route",
    },
    {
      pathname: "/admin/log-in",
      expectation: false,
      message: "is not a valid auth route",
    },
  ])(
    "should return $output if $pathname $message",
    ({ pathname, expectation }) => {
      const result = isAuthRoute(pathname);
      expect(result).toBe(expectation);
    }
  );

  it.each([
    {
      pathname: "/admin/sign-up",
      expectation: false,
      message: "is not a valid protected route",
    },
    {
      pathname: "/admin/sign-in",
      expectation: false,
      message: "is not a valid protected route",
    },
    {
      pathname: "/admin/dashboard",
      expectation: true,
      message: "is a valid protected route",
    },
    {
      pathname: "/admin/settings",
      expectation: true,
      message: "is a valid protected route",
    },
  ])(
    "should return $output if $pathname $message",
    ({ pathname, expectation }) => {
      const result = isProtectedRoute(pathname);
      expect(result).toBe(expectation);
    }
  );

  it.each([
    {
      pathname: "/admin/sign-up",
      expectation: true,
      message: "is a valid public route",
    },
    {
      pathname: "/admin/sign-in",
      expectation: true,
      message: "is a valid public route",
    },
    {
      pathname: "/admin/dashboard",
      expectation: false,
      message: "is not a valid public route",
    },
    {
      pathname: "/admin/settings",
      expectation: false,
      message: "is not a valid public route",
    },
  ])(
    "should return $output if $pathname $message",
    ({ pathname, expectation }) => {
      const result = isPublicRoute(pathname);
      expect(result).toBe(expectation);
    }
  );
});
