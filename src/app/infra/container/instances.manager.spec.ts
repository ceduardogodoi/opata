import { describe, it, expect, vi } from "vitest";
import { InstancesManager } from "./instances-manager";

describe("instances manager", () => {
  it("should register all application dependencies instances", () => {
    const spyDependencyInjectionInit = vi.spyOn(
      InstancesManager,
      "init"
    );

    InstancesManager.init();

    expect(spyDependencyInjectionInit).toHaveBeenCalled();
  });
});
