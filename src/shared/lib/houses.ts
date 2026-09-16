export const HOUSES = [
  "Gryffindor",
  "Hufflepuff",
  "Ravenclaw",
  "Slytherin",
] as const;

export type House = (typeof HOUSES)[number];

export function isHouse(value: string | null | undefined): value is House {
  return HOUSES.some((house) => house === value);
}
