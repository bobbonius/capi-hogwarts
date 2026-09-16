import { describe, expect, it } from "vitest";

import { truncate } from "./utils";

describe("truncate", () => {
  it("returns the original string when it is shorter than the limit", () => {
    expect(truncate("Harry", 10)).toBe("Harry");
  });

  it("returns the original string when it matches the limit", () => {
    expect(truncate("Harry", 5)).toBe("Harry");
  });

  it("cuts the string and appends an ellipsis when it is longer than the limit", () => {
    expect(truncate("Harry Potter", 5)).toBe("Harry...");
  });

  it("defaults to a max length of 100", () => {
    const text = "a".repeat(101);

    expect(truncate(text)).toBe(`${"a".repeat(100)}...`);
  });
});
