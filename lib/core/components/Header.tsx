import React from 'react';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import { Database } from '@/types/database.types';
import Logout from '@/auth/components/Logout';
import Button from '@/core/components/Button';
import logo from '@/assets/boniche-gang-logo.png';
import Link from './Link';

export default async function Header() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const session = (await supabase.auth.getSession()).data.session;

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
      href: '/servers',
      label: 'Servers',
      condition:
        session?.user && session?.user.role?.toLowerCase() === 'members'
    },
    {
      href: '/products',
      label: 'Products',
      condition:
        session?.user && session?.user.role?.toLowerCase() === 'members'
    },
    {
      href: '/users',
      label: 'Profile',
      condition: session?.user && session?.user.role?.toLowerCase() === 'admin'
    }
  ];

  return (
    <header className="flex items-center justify-between p-4 md:p-10 w-screen">
      <div className="flex items-center gap-4">
        <img src={logo.src} alt="Boniche Gang Logo" className="w-14 h-14" />
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
        <Link href="/report" icon='bug_report'>Report a bug</Link>
        {session?.user ? (
          <li>
            <Logout />
          </li>
        ) : (
          <>
            <Button href="/login">Sign in</Button>
            <Button style="secondary" href="/register">
              Register
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
