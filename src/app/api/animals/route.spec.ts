import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /animals", () => {
  it("POST should be defined", () => {
    expect(POST).toBeDefined();
  });
});
