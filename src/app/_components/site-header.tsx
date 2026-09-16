import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 flex w-full items-center bg-background p-4'>
      <div className='flex h-24 w-full items-center justify-center px-4'>
        <Link href='/' className='flex items-center gap-2.5'>
          <Image
            src='/capi.png'
            alt='Capi Hogwarts'
            width={288}
            height={192}
            className='h-24 w-auto object-contain'
            loading='eager'
            priority
          />
        </Link>
      </div>
    </header>
  );
}
