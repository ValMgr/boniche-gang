import React from 'react';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Database } from '@/types/database.types';

export default async function AvatarPreview() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const user_id = (await supabase.auth.getSession()).data.session?.user?.id;
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
    .single();

  console.log('profile: ', profile);

  if (error || !profile) {
    console.error(error);
    return;
  }

  return (
    <div className="flex items-center gap-4">
      {profile.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="relative w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}
