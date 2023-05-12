import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import Link from '@/core/components/Link';
import logo from '@/assets/boniche-gang-logo.png';
import { Database } from '@/types/database.types';
import Logout from '@/auth/components/Logout';
import Button from '@/core/components/Button';
import AvatarPreview from '@/auth/components/AvatarPreview';

const revalidate = 0;

export default async function Header() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const user = (await supabase.auth.getSession()).data.session?.user;

  const links = [
    {
      href: '/',
      label: 'Home',
      condition: true
    },
    {
      href: '/members',
      label: 'Members',
      condition: true
    },
    {
      href: '/marketplace',
      label: 'Marketplace',
      condition: true
    },
    {
      href: '/dashboard/servers',
      label: 'Servers',
      condition:
        (user && user.role?.toLowerCase() === 'members') ||
        user?.role?.toLowerCase() === 'admin'
    },
    {
      href: '/dashboard/products',
      label: 'Products',
      condition:
        (user && user.role?.toLowerCase() === 'members') ||
        user?.role?.toLowerCase() === 'admin'
    },
    {
      href: '/dashboard/users',
      label: 'Users',
      condition: user && user.role?.toLowerCase() === 'admin'
    }
  ];

  return (
    <header className="flex items-center justify-between p-4 md:p-10 w-screen">
      <div className="flex items-center gap-4">
        <img src={logo.src} alt="Boniche Gang Logo" className="w-14 h-14" height={56} width={56} />
        <h1 className="text-2xl font-bold">Boniche Gang</h1>
        <nav className="ml-5">
          <ul className="flex space-x-4">
            {links.map(({ href, label, condition }) => {
              if (!condition) return null;

              return (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="flex space-x-4 items-center">
        <Link href="/report" icon="bug_report">
          Report a bug
        </Link>

        <>
          {user ? (
            <>
              {/* @ts-expect-error Async Server Component */}
              <AvatarPreview />
              <Logout />
            </>
          ) : (
            <>
              <Button href="/login">Sign in</Button>
              <Button style="secondary" href="/register">
                Register
              </Button>
            </>
          )}
        </>
      </div>
    </header>
  );
}
