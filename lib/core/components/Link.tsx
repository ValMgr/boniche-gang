'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
  href: string;
  target?: string;
  style?: 'primary' | 'secondary';
  role?: string;
  disabled?: boolean;
}

export default function Link({
  children,
  href,
  target,
  style = 'primary',
  role = 'link',
  disabled = false
}: Props) {
  const pathname = usePathname();
  if (style === 'secondary') {
    return (
      <a
        href={href}
        target={target}
        role={role}
        className={`text-zinc-100 hover:text-zinc-300 flex items-center ${
          disabled && 'pointer-events-none opacity-50'
        } ${href === pathname && 'underline'}`}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target={target}
      role={role}
      className={`text-zinc-900 hover:text-zinc-700 flex items-center ${
        disabled && 'pointer-events-none opacity-50'
      } ${href === pathname && 'underline'}`}
      aria-disabled={disabled}
    >
      {children}
    </a>
  );
}
