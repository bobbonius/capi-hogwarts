import type { SearchParams } from "@/shared/types";
import type {
  Character,
  CharacterListResponse,
} from "@/shared/types/potterdb-api";

const CHARACTERS_URL = "https://api.potterdb.com/v1/characters";
const PAGE_SIZE = 15;

export interface CharacterList {
  readonly characters: Character[];
  readonly hasNextPage: boolean;
}

export const getCharacters = async (
  searchParams: SearchParams,
): Promise<CharacterList> => {
  const url = new URL(CHARACTERS_URL);

  url.searchParams.set("page[size]", String(PAGE_SIZE));
  url.searchParams.set("page[number]", searchParams.page ?? "1");

  if (searchParams.house) {
    url.searchParams.set("filter[house_eq]", searchParams.house);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load characters");
  }

  const data = (await response.json()) as CharacterListResponse;

  return {
    characters: data.data,
    hasNextPage: Boolean(data.links?.next),
  };
};
