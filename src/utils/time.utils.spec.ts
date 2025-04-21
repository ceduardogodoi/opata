import { describe, expect, it } from "vitest";
import { TimeConverter } from "./time.utils";

describe("TimeConverter", () => {
  it("should properly convert milliseconds to milliseconds", () => {
    const instance = new TimeConverter({
      milliseconds: 1,
    });

    const milliseconds = instance.toMilliseconds();

    expect(milliseconds).toBe(1);
  });

  it("should properly convert seconds to milliseconds", () => {
    const instance = new TimeConverter({
      seconds: 1,
    });

    const milliseconds = instance.toMilliseconds();

    expect(milliseconds).toBe(1000);
  });

  it("should properly convert minutes to milliseconds", () => {
    const instance = new TimeConverter({
      minutes: 1,
    });

    const milliseconds = instance.toMilliseconds();

    expect(milliseconds).toBe(60000);
  });

  it("should properly convert hours to milliseconds", () => {
    const instance = new TimeConverter({
      hours: 1,
    });

    const milliseconds = instance.toMilliseconds();

    expect(milliseconds).toBe(3600000);
  });

  it("should properly convert days to milliseconds", () => {
    const instance = new TimeConverter({
      days: 1,
    });

    const milliseconds = instance.toMilliseconds();

    expect(milliseconds).toBe(86400000);
  });

  it("should properly convert all time parts to milliseconds", () => {
    const instance = new TimeConverter({
      milliseconds: 1,
      seconds: 1,
      minutes: 1,
      hours: 1,
      days: 1,
    });

    const milliseconds = instance.toMilliseconds();

    expect(milliseconds).toBe(90061001);
  });
});
