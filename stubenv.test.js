import { beforeEach, describe, expect, it, vi } from "vitest";

describe("vi.stubEnv with undefined", () => {
  beforeEach(() => {
    process.env = {};
    vi.stubEnv("foo", "initial-value");
  });

  it("stubEnv with a string value works as expected", () => {
    vi.stubEnv("foo", "new-value");

    expect(process.env.foo).toBe("new-value");
  });

  it("stubEnv(key, undefined) should make process.env[key] === undefined", () => {
    vi.stubEnv("foo", undefined);

    expect(process.env.foo).toBeUndefined();
  });
});
