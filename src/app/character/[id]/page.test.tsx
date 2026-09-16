import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Character } from "@/shared/types/potterdb-api";

import { getCharacter } from "./_lib/getCharacter";
import CharacterPage, { generateMetadata } from "./page";

vi.mock("./_lib/getCharacter", () => ({
  getCharacter: vi.fn(),
}));

const character: Character = {
  id: "c1637a49-3cc8-4285-93a1-28e6579f1f20",
  type: "character",
  attributes: {
    slug: "harry-potter",
    name: "Harry Potter",
    house: "Gryffindor",
    species: "Human",
    gender: "Male",
    born: "31 July 1980",
    wiki: "https://harrypotter.fandom.com/wiki/Harry_Potter",
  },
};

describe("CharacterPage", () => {
  beforeEach(() => {
    vi.mocked(getCharacter).mockReset();
  });

  it("loads the character for the route id and renders their profile", async () => {
    vi.mocked(getCharacter).mockResolvedValue(character);

    const page = await CharacterPage({
      params: Promise.resolve({ id: character.id }),
      searchParams: Promise.resolve({}),
    });

    render(page);

    expect(getCharacter).toHaveBeenCalledWith(character.id);
    expect(
      screen.getByRole("heading", { name: "Harry Potter" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Gryffindor")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to characters" }),
    ).toHaveAttribute("href", "/");
  });

  it("uses the character name as the page title", async () => {
    vi.mocked(getCharacter).mockResolvedValue(character);

    await expect(
      generateMetadata({
        params: Promise.resolve({ id: character.id }),
        searchParams: Promise.resolve({}),
      }),
    ).resolves.toEqual({ title: "Harry Potter" });
  });
});
