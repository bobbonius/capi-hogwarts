import { isHouse } from "@/shared/lib/houses";

export function buildPaginationUrl({
  page = 1,
  house,
}: {
  page?: number;
  house?: string;
}): string {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (isHouse(house)) {
    params.set("house", house);
  }

  const query = params.toString();
  return query === "" ? "/" : `/?${query}`;
}
