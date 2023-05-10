'use client';

import Link from '@/core/components/Link';

interface ButtonProps {
  style?: 'primary' | 'secondary' | 'link';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  icon?: string;
  iconType?: 'filled' | 'outlined';
}

export default function Button({
  children,
  style = 'primary',
  onClick,
  disabled,
  type = 'button',
  href,
  icon,
  iconType = 'filled'
}: ButtonProps) {
  const iconSlug =
    iconType === 'filled' ? 'material-icons' : 'material-icons-outlined';

  if (style === 'secondary') {
    if (href) {
      return (
        <a
          href={href}
          className="bg-transparent border border-zinc-900 hover:border-zinc-700 text-zinc-900 hover:text-zinc-700 py-2 px-4 rounded transition-colors duration-300 flex items-center"
        >
          {icon && <span className={`${iconSlug} mr-1`}>{icon}</span>}
          {children}
        </a>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="bg-transparent border border-zinc-900 hover:border-zinc-700 text-zinc-900 hover:text-zinc-700 py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        {icon && <span className={`${iconSlug} mr-1`}>{icon}</span>}

        {children}
      </button>
    );
  }

  if (style === 'link') {
    if (href) {
      return (
        <Link href={href} icon={icon} iconType={iconType}>
          {children}
        </Link>
      );
    }

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="text-zinc-900 background-transparent hover:text-zinc-700 transition-colors duration-300 flex items-center"
      >
        {icon && <span className={`${iconSlug} mr-1`}>{icon}</span>}
        {children}
      </button>
    );
  }

  if (href) {
    if (href) {
      return (
        <a
          href={href}
          className="bg-zinc-900 hover:bg-zinc-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
        >
          {icon && <span className={`${iconSlug} mr-1`}>{icon}</span>}
          {children}
        </a>
      );
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="bg-zinc-900 hover:bg-zinc-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center"
    >
      {icon && <span className={`${iconSlug} mr-1`}>{icon}</span>}
      {children}
    </button>
  );
}
