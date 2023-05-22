'use client';

import { MouseEvent } from 'react';

import Link from '@/core/components/Link';

interface ButtonProps {
  style?: 'primary' | 'secondary' | 'link';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | (() => void) | Promise<void>;
  disabled?: boolean;
  href?: string;
  form?: string;
}

export default function Button({
  children,
  style = 'primary',
  onClick,
  disabled,
  type = 'button',
  href,
  form
}: ButtonProps) {
  if (style === 'secondary') {
    if (href) {
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : '_self'}
          className="bg-transparent border border-zinc-900 hover:border-zinc-700 disabled:opacity-20 disabled:hover:border-zinc-900 disabled:cursor-not-allowed text-zinc-900 hover:text-zinc-700 py-2 px-4 rounded transition-colors duration-300 flex items-center"
        >
          {children}
        </a>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        form={form}
        className="bg-transparent border border-zinc-900 hover:border-zinc-700 disabled:opacity-20 disabled:hover:border-zinc-900 disabled:cursor-not-allowed text-zinc-900 hover:text-zinc-700 py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        {children}
      </button>
    );
  }

  if (style === 'link') {
    if (href) {
      return <Link href={href}>{children}</Link>;
    }

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        form={form}
        className="text-zinc-900 background-transparent hover:text-zinc-700 disabled:cursor-not-allowed transition-colors duration-300 flex items-center disabled:opacity-50"
      >
        {children}
      </button>
    );
  }

  if (href) {
    if (href) {
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : '_self'}
          className="bg-zinc-900 hover:bg-zinc-700 disabled:opacity-20 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
        >
          {children}
        </a>
      );
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      form={form}
      className="bg-zinc-900 hover:bg-zinc-700 disabled:opacity-20 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
    >
      {children}
    </button>
  );
}
