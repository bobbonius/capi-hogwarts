"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { HOUSES, isHouse } from "@/shared/lib/houses";

import { buildPaginationUrl } from "../_lib/buildPaginationUrl";

interface Props {
  readonly house?: string;
}

export function HouseFilter({ house }: Props) {
  const router = useRouter();
  const selectedHouse = isHouse(house) ? house : "all";

  function handleHouseChange(nextHouse: string | null): void {
    if (nextHouse === null || nextHouse === "all") {
      router.push(buildPaginationUrl({}));
      return;
    }

    if (!isHouse(nextHouse)) {
      return;
    }

    router.push(buildPaginationUrl({ house: nextHouse }));
  }

  return (
    <Select
      // Base UI `items` is a value → label map, not an array. House names are
      // both, so they copy to themselves; only "all" needs a different label.
      items={{
        all: "All houses",
        ...Object.fromEntries(
          HOUSES.map((houseName) => [houseName, houseName]),
        ),
      }}
      value={selectedHouse}
      onValueChange={handleHouseChange}
    >
      <SelectTrigger aria-label='Filter by house' className='min-w-40'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align='end'>
        <SelectItem value='all'>All houses</SelectItem>
        {HOUSES.map((houseName) => (
          <SelectItem key={houseName} value={houseName}>
            {houseName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
