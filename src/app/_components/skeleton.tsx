import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

const SKELETON_ROWS = 15;
const COLUMN_SKELETONS = [
  { header: "Name", className: "h-4 w-40" },
  { header: "House", className: "h-5 w-20 rounded-full" },
  { header: "Role", className: "h-4 w-28" },
  { header: "Wand", className: "h-4 w-32" },
] as const;

export function SkeletonLoader() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='overflow-hidden rounded-xl border'>
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMN_SKELETONS.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: SKELETON_ROWS }, (_, row) => (
              <TableRow key={row}>
                {COLUMN_SKELETONS.map((column) => (
                  <TableCell key={column.header}>
                    <Skeleton className={column.className} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <Skeleton className='h-4 w-16' />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-7 w-20' />
          <Skeleton className='h-7 w-12' />
        </div>
      </div>
    </div>
  );
}
