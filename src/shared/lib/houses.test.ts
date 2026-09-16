import { describe, expect, it } from "vitest";

import { HOUSES, isHouse } from "./houses";

describe("HOUSES", () => {
  it("lists the four Hogwarts houses", () => {
    expect(HOUSES).toEqual([
      "Gryffindor",
      "Hufflepuff",
      "Ravenclaw",
      "Slytherin",
    ]);
  });
});

describe("isHouse", () => {
  it("returns true for a Hogwarts house", () => {
    expect(isHouse("Gryffindor")).toBe(true);
  });

  it("returns false for unknown, empty, or missing values", () => {
    expect(isHouse("Durmstrang")).toBe(false);
    expect(isHouse("all")).toBe(false);
    expect(isHouse("")).toBe(false);
    expect(isHouse(null)).toBe(false);
    expect(isHouse(undefined)).toBe(false);
  });
});
