import Link from "next/link";

import { Badge } from "@/shared/components/ui/badge";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { truncate } from "@/shared/lib/utils";
import type { Character } from "@/shared/types/potterdb-api";

function formatList(values: readonly string[] | undefined): string {
  if (values === undefined || values.length === 0) {
    return "—";
  }

  return truncate(values.join(", "), 25);
}

interface Props {
  readonly character: Character;
}

export function CharacterRow({ character }: Props) {
  const { name, house, jobs, wands } = character.attributes;

  return (
    <TableRow className='relative cursor-pointer'>
      <TableCell>
        <Link
          href={`/character/${character.id}`}
          className='text-inherit no-underline after:absolute after:inset-0 after:z-10'
        >
          {truncate(name, 25)}
        </Link>
      </TableCell>
      <TableCell>
        {house ? <Badge variant='outline'>{truncate(house)}</Badge> : "—"}
      </TableCell>
      <TableCell>{formatList(jobs)}</TableCell>
      <TableCell>{formatList(wands)}</TableCell>
    </TableRow>
  );
}
