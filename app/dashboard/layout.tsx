import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Database } from '@/types/database.types';
import Login from '@app/(auth)/login/page';

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const session = (await supabase.auth.getSession()).data.session;

  if (!session) {
    return <Login />;
  }

  return <>{children}</>;
}
