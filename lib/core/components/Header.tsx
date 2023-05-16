import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { FaBug } from 'react-icons/fa';

import Link from '@/core/components/Link';
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

  const user_id = (await supabase.auth.getUser()).data.user?.id;
  if (!user_id) return null;

  const { data: permissions, error } = await supabase
    .from('roles')
    .select('role')
    .eq('id', user_id)
    .single();

  if (error) {
    console.error(error);
  }

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
      href: '/events',
      label: 'Events',
      condition: true
    },
    {
      href: '/shop',
      label: 'Shop',
      condition: true
    },
    {
      href: '/dashboard/overview',
      label: 'Dashboard',
      condition:
        (permissions && permissions.role?.toLowerCase() === 'members') ||
        permissions?.role?.toLowerCase() === 'admin'
    }
  ];

  return (
    <header className="flex items-center justify-between p-4 md:p-10 w-screen">
      <div className="flex items-center gap-4">
        <img
          src="/boniche-gang-logo.png"
          alt="Boniche Gang Logo"
          className="w-14 h-14"
          height={56}
          width={56}
        />
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
        <Link href="/report">
          <FaBug className="mr-2" />
          Report a bug
        </Link>

        <>
          {user_id ? (
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
