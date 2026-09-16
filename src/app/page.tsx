import { Suspense } from "react";

import type { SearchParams } from "@/shared/types";

import { CharactersTable } from "./_components/characters-table";
import { HouseFilter } from "./_components/house-filter";
import { SkeletonLoader } from "./_components/skeleton";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { page, house } = (await searchParams) as SearchParams;

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-4'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-xl font-medium tracking-tight'>Characters</h1>
          <p className='text-sm text-muted-foreground'>
            Browse the Hogwarts registry.
          </p>
        </div>
        <HouseFilter house={house} />
      </div>
      <Suspense fallback={<SkeletonLoader />}>
        <CharactersTable page={page} house={house} />
      </Suspense>
    </div>
  );
}
