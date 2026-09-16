import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { isHouse } from "@/shared/lib/houses";

import { buildPaginationUrl } from "../_lib/buildPaginationUrl";
import { getCharacters } from "../_lib/getCharacters";
import { CharacterRow } from "./character-row";
import { PaginationLink } from "./pagination-link";

interface Props {
  readonly page?: string;
  readonly house?: string;
}

export async function CharactersTable({ page, house }: Props) {
  const selectedHouse = isHouse(house) ? house : undefined;
  const pageNumber = Number(page) || 1;
  const { characters, hasNextPage } = await getCharacters({
    page,
    house: selectedHouse,
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='overflow-hidden rounded-xl border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Wand</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters.length > 0 ? (
              characters.map((character) => (
                <CharacterRow key={character.id} character={character} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-sm text-muted-foreground'>Page {pageNumber}</p>
        <div className='flex items-center gap-2'>
          <PaginationLink
            href={buildPaginationUrl({
              page: pageNumber - 1,
              house: selectedHouse,
            })}
            disabled={pageNumber <= 1}
          >
            Previous
          </PaginationLink>
          <PaginationLink
            href={buildPaginationUrl({
              page: pageNumber + 1,
              house: selectedHouse,
            })}
            disabled={!hasNextPage}
          >
            Next
          </PaginationLink>
        </div>
      </div>
    </div>
  );
}
