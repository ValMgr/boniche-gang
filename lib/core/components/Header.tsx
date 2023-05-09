import React from 'react';
import { useRouter } from 'next/router';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import { Database } from '@/types/database.types';
import Logout from '@/auth/components/Logout';

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
      href: '/dashboard',
      label: 'Dashboard',
      condition: session?.user
    },
    {
      href: '/profile',
      label: 'Profile',
      condition: session?.user
    },
    {
      href: '/login',
      label: 'Login',
      condition: !session?.user
    }
  ];

  return (
    <header className="flex items-center justify-between p-4 md:p-10 w-screen">
      <h1 className="text-2xl font-bold">Boniche Gang</h1>
      <nav>
        <ul className="flex space-x-4">
          {links.map(({ href, label, condition }) => {
            if (!condition) return null;

            return (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            );
          })}

          {session?.user && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
