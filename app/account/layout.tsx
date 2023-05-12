import { ReactNode } from 'react';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import Link from '@/core/components/Link';
import Login from '@app/(auth)/login/page';
import { Database } from '@/types/database.types';

interface Props {
  children: ReactNode;
}

export default async function AccountLayout({ children }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const session = (await supabase.auth.getSession()).data.session;

  if (!session) {
    return <Login />;
  }

  
  return (
    <>
      <h1 className="text-3xl font-medium tracking-tight">Settings</h1>
      <hr className="my-8" />

      <div className="flex flex-row gap-4">
        <aside className="flex flex-col items-start gap-4 w-1/4">
          <ul className="flex flex-col items-start gap-4">
            <li>
              <Link href="/account/profile">Profile</Link>
            </li>
            <li>
              <Link href="/account/password" disabled>
                Password
              </Link>
            </li>
            <li>
              <Link href="/account/privacy" disabled>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/account/notifications" disabled>
                Notifications
              </Link>
            </li>
            <li>
              <Link href="/account/orders" disabled>
                Orders
              </Link>
            </li>
            <li>
              <Link href="/account/events" disabled>
                Events
              </Link>
            </li>
          </ul>
        </aside>

        <section className="flex flex-col items-start gap-4 w-3/4">
          {children}
        </section>
      </div>
    </>
  );
}
