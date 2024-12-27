import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { env } from "./env";

describe("env / valid", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_OPTIONS", "--require reflect-metadata");
    vi.stubEnv("VERCEL_ORG_ID", "vercel_org_id");
    vi.stubEnv("VERCEL_PROJECT_ID", "vercel_project_id");
    vi.stubEnv("VERCEL_TOKEN", "vercel_token");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should have all environment variables validated and defined", () => {
    expect(env).toBeDefined();
    expect(env.NODE_ENV).toBe("test");
    expect(env.NODE_OPTIONS).toBe("--require reflect-metadata");
    expect(env.VERCEL_ORG_ID).toBe("vercel_org_id");
    expect(env.VERCEL_PROJECT_ID).toBe("vercel_project_id");
    expect(env.VERCEL_TOKEN).toBe("vercel_token");
  });
});
