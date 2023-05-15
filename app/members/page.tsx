import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Database } from '@/types/database.types';
import { Grid } from '@tremor/react';

export default async function MembersPage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: profiles, error } = await supabase.from('profiles').select('*, country:countries(name)');

  if (error) {
    console.error(error);
    return (
      <div className="text-red-500 background-red-100">
        {error.message}
      </div>
    );
  }

  if (!profiles) {
    return <div>No users found</div>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Members</h1>
      <Grid className='mt-4 gap-2' numCols={1} numColsMd={3} numColsLg={5}>
        {profiles.map((profile) => (
          <div key={profile.id} className="rounded-lg shadow border border-gray-200">
            <img src={profile.avatar_url!} className="rounded-t-lg" />
            <div className="flex flex-col p-5">
              <span className="font-bold">{profile.username}</span>
              <span className="text-sm text-gray-500">{(profile.country as {name: string}).name}</span>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}
