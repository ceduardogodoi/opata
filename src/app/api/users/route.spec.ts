import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /users", () => {
  it("POST (sign up user) should be defined", () => {
    expect(POST).toBeDefined();
  });
});
