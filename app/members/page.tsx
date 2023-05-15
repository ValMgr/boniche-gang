import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Database } from '@/types/database.types';
import { Grid } from '@tremor/react';

export default async function MembersPage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*, country:countries(name)');

  if (error) {
    console.error(error);
    return (
      <div className="text-red-500 background-red-100">{error.message}</div>
    );
  }

  if (!profiles) {
    return <div>No users found</div>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Members</h1>
      <Grid className="mt-4 gap-5" numCols={1} numColsMd={3} numColsLg={5}>
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col rounded-lg shadow border border-gray-200"
          >
            {profile.avatar_url ? (
              <img src={profile.avatar_url!} className="rounded-t-lg" />
            ) : (
              <div className="relative w-full flex-1 bg-gray-200 rounded-t-lg overflow-hidden">
                <svg
                  className="absolute w-26 h-26 text-gray-400 -left-2 top-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
            <div className="flex flex-col p-5">
              <span className="font-bold">{profile.username}</span>
              <span className="text-sm text-gray-500">
                {(profile.country as { name: string }).name}
              </span>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}
