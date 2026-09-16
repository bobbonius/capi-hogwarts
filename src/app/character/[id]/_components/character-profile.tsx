import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon, UserRoundIcon } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import type { Character } from "@/shared/types/potterdb-api";

import { CharacterFacts } from "./character-facts";
import { CharacterLists } from "./character-lists";

interface Props {
  readonly character: Character;
}

function isPresent(value: string | null | undefined): value is string {
  return value !== null && value !== undefined && value !== "";
}

export function CharacterProfile({ character }: Props) {
  const { attributes } = character;
  const {
    alias_names: aliasNames,
    animagus,
    blood_status: bloodStatus,
    boggart,
    born,
    died,
    eye_color: eyeColor,
    family_members: familyMembers,
    gender,
    hair_color: hairColor,
    height,
    house,
    image,
    jobs,
    marital_status: maritalStatus,
    name,
    nationality,
    patronus,
    romances,
    skin_color: skinColor,
    species,
    titles,
    wands,
    weight,
    wiki,
  } = attributes;

  const facts = [
    { label: "Born", value: born },
    { label: "Died", value: died },
    { label: "Blood status", value: bloodStatus },
    { label: "Nationality", value: nationality },
    { label: "Marital status", value: maritalStatus },
    { label: "Height", value: height },
    { label: "Weight", value: weight },
    { label: "Hair color", value: hairColor },
    { label: "Eye color", value: eyeColor },
    { label: "Skin color", value: skinColor },
    { label: "Animagus", value: animagus },
    { label: "Boggart", value: boggart },
    { label: "Patronus", value: patronus },
  ].flatMap((fact) =>
    isPresent(fact.value) ? [{ label: fact.label, value: fact.value }] : [],
  );

  const lists = [
    { title: "Aliases", values: aliasNames },
    { title: "Titles", values: titles },
    { title: "Jobs", values: jobs },
    { title: "Wands", values: wands },
    { title: "Family", values: familyMembers },
    { title: "Romances", values: romances },
  ].flatMap((list) =>
    list.values !== undefined && list.values.length > 0
      ? [{ title: list.title, values: list.values }]
      : [],
  );

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-4'>
      <Button
        variant='outline'
        size='sm'
        className='w-fit'
        nativeButton={false}
        render={<Link href='/' />}
      >
        <ArrowLeftIcon data-icon='inline-start' />
        Back to characters
      </Button>

      <div className='flex flex-col gap-6 sm:flex-row'>
        <div className='relative flex aspect-3/4 w-full max-w-52 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10'>
          {isPresent(image) ? (
            <Image
              src={image}
              alt={name}
              fill
              unoptimized
              sizes='208px'
              className='object-cover'
              loading='eager'
            />
          ) : (
            <UserRoundIcon
              aria-hidden
              className='size-16 text-muted-foreground'
            />
          )}
        </div>

        <div className='flex min-w-0 flex-1 flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-medium tracking-tight'>{name}</h1>
            <div className='flex flex-wrap items-center gap-2'>
              {isPresent(house) ? (
                <Badge variant='outline'>{house}</Badge>
              ) : undefined}
              {isPresent(species) ? (
                <p className='text-sm text-muted-foreground'>{species}</p>
              ) : undefined}
              {isPresent(gender) ? (
                <p className='text-sm text-muted-foreground'>{gender}</p>
              ) : undefined}
            </div>
          </div>

          {isPresent(wiki) ? (
            <Button
              variant='outline'
              size='sm'
              className='w-fit'
              nativeButton={false}
              render={<a href={wiki} target='_blank' rel='noreferrer' />}
            >
              Harry Potter Wiki
              <ExternalLinkIcon data-icon='inline-end' />
            </Button>
          ) : undefined}
        </div>
      </div>

      <CharacterFacts facts={facts} />
      <CharacterLists lists={lists} />
    </div>
  );
}
