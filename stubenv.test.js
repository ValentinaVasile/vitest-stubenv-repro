import { beforeEach, describe, expect, it, vi } from "vitest";

// Simulate an env-reading function (like app.config.js)
function readEnv(name) {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`The environment variable ${name} must be defined`);
  }
  return value;
}

describe("vi.stubEnv with undefined", () => {
  beforeEach(() => {
    // Replicate the exact pattern from the real test:
    // process.env is replaced with a plain object, then keys are set via vi.stubEnv.
    // This is the setup that causes vi.stubEnv(key, undefined) to break in Vitest 4.
    process.env = {};
    vi.stubEnv("foo", "initial-value");
  });

  it("stubEnv with a string value works as expected", () => {
    vi.stubEnv("foo", "new-value");

    expect(process.env.foo).toBe("new-value");
  });

  it("stubEnv(key, undefined) should make process.env[key] === undefined", () => {
    vi.stubEnv("foo", undefined);

    // In Vitest 3 this passed. In Vitest 4 it fails — process.env.foo retains "initial-value".
    expect(process.env.foo).toBeUndefined();
  });
});
