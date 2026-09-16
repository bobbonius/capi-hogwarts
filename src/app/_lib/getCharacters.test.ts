import { beforeEach, describe, expect, it, vi } from "vitest";

import { getCharacters } from "./getCharacters";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/vnd.api+json" },
  });
}

describe("getCharacters", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("omits the house filter when no house is selected", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse({ data: [], links: {} }));

    await getCharacters({});

    const url = new URL(String(vi.mocked(fetch).mock.calls[0]?.[0]));

    expect(url.searchParams.get("page[size]")).toBe("15");
    expect(url.searchParams.get("page[number]")).toBe("1");
    expect(url.searchParams.has("filter[house_eq]")).toBe(false);
  });

  it("filters by house on the server", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse({ data: [], links: {} }));

    await getCharacters({ house: "Gryffindor" });

    const url = new URL(String(vi.mocked(fetch).mock.calls[0]?.[0]));
    
    expect(url.searchParams.get("filter[house_eq]")).toBe("Gryffindor");
  });

  it("exposes the next page from the API links", async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse({
        data: [{ id: "1" }],
        links: {
          next: "https://api.potterdb.com/v1/characters?page[number]=2",
        },
      }),
    );

    await expect(getCharacters({ page: "1" })).resolves.toMatchObject({
      hasNextPage: true,
    });
  });

  it("throws when the API response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse({}, 500));

    await expect(getCharacters({})).rejects.toThrow(
      "Failed to load characters",
    );
  });
});
