import { describe, it, expect } from "vitest";
import { NodeEnvEnum } from "./enums";

describe("globals / enums", () => {
  it("should have 'development', 'production', and 'test' NODE_ENV values only", () => {
    const values = Object.values(NodeEnvEnum);
    expect(values).toContain("development");
    expect(values).toContain("production");
    expect(values).toContain("test");
    expect(values).toHaveLength(3);
  });

  it("should not contain any other values", () => {
    const values = Object.values(NodeEnvEnum);
    expect(values).not.toContain("dummy");
    expect(values).not.toContain("wrong");
  });
});
