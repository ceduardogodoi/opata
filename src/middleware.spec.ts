import { describe, it, expect, vi } from "vitest";
import { middleware } from "./middleware";
import { NextRequest, NextResponse } from "next/server";
import { JwtService } from "./app/infra/security/jwt-service";

vi.mock("next/server", async (importOriginal) => {
  const originalModule = await importOriginal<typeof import("next/server")>();

  return {
    ...originalModule,
    NextResponse: {
      ...originalModule.NextResponse,
      next: vi.fn(),
      redirect: vi.fn().mockReturnValue({
        cookies: {
          delete: vi.fn(),
        },
      }),
    },
  };
});

describe("middleware", () => {
  const expiredToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYjE0YWJlNC02YjdmLTQ5MGUtYmQxYy0xMzM3ZWEzZTRjM2YiLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwidXNlcm5hbWUiOiJqZG9lIiwiZW1haWwiOiJqZG9lQGdtYWlsLmNvbSIsImlhdCI6MTc0NDg5ODY5NiwiZXhwIjoxNzQ0OTAyMjk2fQ.P8eyruA3SzkFgpe5HromsMuLzHaN_iYNdNyV3AC48ck";

  it("should navigate the user with no redirect when it is a public route", () => {
    const request = {
      cookies: {
        get: () => ({
          value: undefined,
        }),
      },
      nextUrl: {
        clone: () => new URL("http://localhost:3000"),
      },
    } as unknown as NextRequest;

    middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("should redirect to login when it's a protected route and user isn't authenticated", () => {
    const request = {
      cookies: {
        get: () => ({
          value: undefined,
        }),
      },
      nextUrl: {
        clone: () => new URL("/admin/dashboard", "http://localhost:3000"),
      },
    } as unknown as NextRequest;

    middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/admin/sign-in", "http://localhost:3000")
    );
  });

  it("should redirect to sign-in when it's an auth route and user is token is invalid", () => {
    const request = {
      cookies: {
        get: () => ({
          value: "access_token",
        }),
      },
      nextUrl: {
        clone: () => new URL("/admin/sign-in", "http://localhost:3000"),
      },
    } as unknown as NextRequest;

    middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/admin/sign-in", "http://localhost:3000")
    );
  });

  it("should redirect to sign-in when token is valid but expired", () => {
    const request = {
      cookies: {
        get: () => ({
          value: expiredToken,
        }),
      },
      nextUrl: {
        clone: () => new URL("/admin/dashboard", "http://localhost:3000"),
      },
    } as unknown as NextRequest;

    middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/admin/sign-in", "http://localhost:3000")
    );
  });

  it("should redirect to dashboard when it's an auth route and user is token is valid", () => {
    const payload = {
      id: "3352e0eb-0592-4cca-8cba-358e22766a09",
      fullName: "Xpto Doe",
      username: "xpto",
      email: "xpto@email.com",
    };

    const token = JwtService.sign(payload);

    const request = {
      cookies: {
        get: () => ({
          value: token,
        }),
      },
      nextUrl: {
        clone: () => new URL("/admin/sign-in", "http://localhost:3000"),
      },
    } as unknown as NextRequest;

    middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/admin/dashboard", "http://localhost:3000")
    );
  });
});
