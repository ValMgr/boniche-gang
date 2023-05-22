import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/database.types';
import Button from '@/core/components/Button';
import Avatar from '@/settings/components/Avatar';
import ProfileForm from '@/settings/components/ProfileForm';

const revalidate = 0;

export default async function Profile() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const user = (await supabase.auth.getUser()).data.user;
  const user_id = user?.id;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
    .single();

  const { data: countries, error: err } = await supabase
    .from('countries')
    .select('id,name')
    .order('name', { ascending: true });

  if (error || err) {
    console.error(error);
  }

  if (!profile || !countries) {
    return <div>An error occurred while fetching your profile</div>;
  }

  return (
    <>
      <div
        className="block w-full h-60 bg-gradient-to-r from-blue-400 to-purple-500 opacity-40"
        style={{ borderRadius: '150px 0 0 0' }}
      ></div>

      <div className="flex flex-row items-center justify-between w-full mb-24">
        <div className="flex flew-row gap-4 ml-52">
          {/* @ts-expect-error Async Server Component */}
          <Avatar />
          <div className="flex flex-col items-start justify-center ml-10">
            <h2 className="text-2xl">Profile</h2>
            <p className="text-sm text-gray-500">
              Update your photo and personal details.
            </p>
          </div>
        </div>

        <Button style="secondary" type="submit" form="profile-form">
          Save
        </Button>
      </div>

      <ProfileForm user={user} profile={profile} countries={countries} />
    </>
  );
}
