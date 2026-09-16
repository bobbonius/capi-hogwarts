import type { Metadata } from "next";

import { CharacterProfile } from "./_components/character-profile";
import { getCharacter } from "./_lib/getCharacter";

export async function generateMetadata({
  params,
}: PageProps<"/character/[id]">): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);

  return {
    title: character.attributes.name,
  };
}

export default async function CharacterPage({
  params,
}: PageProps<"/character/[id]">) {
  const { id } = await params;
  const character = await getCharacter(id);

  return <CharacterProfile character={character} />;
}
