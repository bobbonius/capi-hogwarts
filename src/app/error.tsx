"use client";

import { Button } from "@/shared/components/ui/button";

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const message =
    error.message === "" ? "The registry could not be loaded." : error.message;

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-4'>
      <div>
        <h1 className='text-xl font-medium tracking-tight'>
          Something went wrong
        </h1>
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
      <Button variant='outline' size='sm' className='w-fit' onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
