import { describe, expect, it } from "vitest";

import { buildPaginationUrl } from "./buildPaginationUrl";

describe("buildPaginationUrl", () => {
  it("returns the home path when page is 1 and no house is selected", () => {
    expect(buildPaginationUrl({})).toBe("/");
    expect(buildPaginationUrl({ page: 1 })).toBe("/");
  });

  it("adds a page query when the page is greater than 1", () => {
    expect(buildPaginationUrl({ page: 2 })).toBe("/?page=2");
  });

  it("adds a house query for a valid house", () => {
    expect(buildPaginationUrl({ house: "Slytherin" })).toBe("/?house=Slytherin");
  });

  it("keeps page and house together so pagination preserves the filter", () => {
    expect(buildPaginationUrl({ page: 3, house: "Ravenclaw" })).toBe(
      "/?page=3&house=Ravenclaw",
    );
  });

  it("ignores invalid houses", () => {
    expect(buildPaginationUrl({ house: "all" })).toBe("/");
    expect(buildPaginationUrl({ page: 2, house: "Beauxbatons" })).toBe(
      "/?page=2",
    );
  });
});
