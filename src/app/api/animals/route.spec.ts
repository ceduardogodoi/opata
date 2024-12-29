import { describe, expect, it } from "vitest";
import { POST, GET } from "./route";

describe("POST /animals", () => {
  it("POST (create animal) should be defined", () => {
    expect(POST).toBeDefined();
  });

  it("GET (find all animals) should be defined", () => {
    expect(GET).toBeDefined();
  });
});
