import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /users - sign in", () => {
  it("POST (sign in user) should be defined", () => {
    expect(POST).toBeDefined();
  });
});
