import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export default function CharacterNotFound() {
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
      <div>
        <h1 className='text-xl font-medium tracking-tight'>
          Character not found
        </h1>
        <p className='text-sm text-muted-foreground'>
          That registry entry does not exist.
        </p>
      </div>
    </div>
  );
}
