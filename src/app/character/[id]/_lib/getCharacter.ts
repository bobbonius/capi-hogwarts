import { notFound } from "next/navigation";

import type {
  Character,
  CharacterResponse,
} from "@/shared/types/potterdb-api";

const CHARACTER_URL = "https://api.potterdb.com/v1/characters";

export const getCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`${CHARACTER_URL}/${id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load character");
  }

  const body = (await response.json()) as CharacterResponse;

  return body.data;
};
