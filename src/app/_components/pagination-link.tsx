import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";

interface Props {
  readonly href: string;
  readonly disabled: boolean;
  readonly children: string;
}

export function PaginationLink({ href, disabled, children }: Props) {
  const className = buttonVariants({ variant: "outline", size: "sm" });

  if (disabled) {
    return (
      <span className={`${className} pointer-events-none opacity-50`}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
