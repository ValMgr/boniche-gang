import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Database } from '@/types/database.types';

export default async function Avatar() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const user_id = (await supabase.auth.getSession()).data.session?.user?.id;
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user_id)
    .single();

  if (error || !profile) {
    console.error(error);
    return;
  }

  return (
    <div className="absolute" style={{ transform: 'translate(-100%, -50%)' }}>
      {profile.avatar_url ? (
        <img
          className="w-40 h-40 p-1 rounded-full ring-8 ring-inset ring-white"
          src={profile?.avatar_url}
          alt="Bordered avatar"
        />
      ) : (
        <div className="relative w-40 h-40 overflow-hidden bg-gray-200 rounded-full ring-8 ring-white">
          <svg
            className="absolute w-40 h-40 -bottom-4 text-gray-400"
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
    </div>
  );
}
