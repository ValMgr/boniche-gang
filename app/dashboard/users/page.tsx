import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/database.types';
import UsersList from '@/dashboard/components/UsersList';

const revalidate = 0;

export default async function Users() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: profiles, error: profile_err } = await supabase
    .from('profiles')
    .select('*, permissions:roles(role), user:users(email, created_at)');

  if (profile_err) {
    console.error(profile_err);
    return (
      <div className="text-red-500 bg-red-100 rounded-lg p-4">
        Error fetching users
      </div>
    );
  }

  if (!profiles) {
    return <div>No users found</div>;
  }

  return <UsersList profiles={profiles} />;
}
