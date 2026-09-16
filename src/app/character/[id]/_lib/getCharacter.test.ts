import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getCharacter } from "./getCharacter";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/vnd.api+json" },
  });
}

describe("getCharacter", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.mocked(notFound).mockClear();
  });

  it("returns the character payload", async () => {
    const character = { id: "harry", type: "character", attributes: { name: "Harry Potter" } };
    vi.mocked(fetch).mockResolvedValue(jsonResponse({ data: character }));

    await expect(getCharacter("harry")).resolves.toEqual(character);
    expect(notFound).not.toHaveBeenCalled();
  });

  it("calls notFound when the API returns 404", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse({}, 404));

    await expect(getCharacter("missing")).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledOnce();
  });
});
