import { describe, expect, it } from "vitest";
import { ProblemDetailError } from "./problem-detail.error";

describe("entities / problem detail error", () => {
  it("should create a problem detail instance with no extension", () => {
    const error = new ProblemDetailError(
      "https://example.com/probs/out-of-credit",
      "You do not have enough credit.",
      "Your current balance is 30, but that costs 50.",
      "/account/12345/msgs/abc"
    );

    expect(error).toBeInstanceOf(ProblemDetailError);
    expect(error.type).toBe("https://example.com/probs/out-of-credit");
    expect(error.title).toBe("You do not have enough credit.");
    expect(error.detail).toBe("Your current balance is 30, but that costs 50.");
    expect(error.instance).toBe("/account/12345/msgs/abc");
    expect(error).not.toHaveProperty("extension");
  });
});
