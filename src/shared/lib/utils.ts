export { cn } from "cn";

export const truncate = (text: string, maxLength: number = 100): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
