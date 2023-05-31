import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Database } from '@/types/database.types';
import Login from '@app/(auth)/login/page';
import Link from '@/core/components/Link';

interface Props {
  children: React.ReactNode;
  params: any;
}

export default async function DashboardLayout({ children, params }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });
  
  const session = (await supabase.auth.getSession()).data.session;
  const user_id = session?.user?.id;
  const { data: permissions } = await supabase
  .from('roles')
  .select('role')
  .eq('id', user_id)
  .single();
  
  if (!session || !permissions) {
    return <Login />;
  }

  const links = [
    {
      href: '/dashboard/overview',
      label: 'Overview',
      condition: true
    },
    {
      href: '/dashboard/servers',
      label: 'Servers',
      condition: true
    },
    {
      href: '/dashboard/users',
      label: 'Users',
      condition: permissions.role === 'admin'
    },
    {
      href: '/dashboard/events',
      label: 'Events',
      condition: true
    },
    {
      href: '/dashboard/products',
      label: 'Products',
      condition: true
    },
    {
      href: '/dashboard/issues',
      label: 'Issues',
      condition: permissions.role === 'admin'
    }
  ];

  return (
    <>
      <h1 className="text-3xl font-medium tracking-tight">Dashboard</h1>
      <hr className="my-8" />

      <div className="flex flex-row gap-4">
        <aside className="flex flex-col items-start gap-4 w-1/5">
          <ul className="flex flex-col items-start gap-4">
            {links.map((link) => {
              if (!link.condition) return null;

              return (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              );
            })}
          </ul>
        </aside>

        <section className="flex flex-col items-start gap-4 w-4/5">
          {children}
        </section>
      </div>
    </>
  );
}
