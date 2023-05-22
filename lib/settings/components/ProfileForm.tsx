'use client';

import { User } from '@supabase/auth-helpers-nextjs';
import { useCallback, useState } from 'react';

import { useSupabase } from '@/auth/provider/SupabaseProvider';
import AvatarInput from '@/settings/components/AvatarInput';
import Error from '@/core/components/Error';
import Success from '@/core/components/Success';

interface Props {
  user: User | null;
  profile: {
    avatar_url: string | null;
    biography: string | null;
    country: number | null;
    full_name: string | null;
    id: string;
    updated_at: string | null;
    username: string | null;
  };
  countries: {
    id: number;
    name: string | null;
  }[];
}

export default function ProfileForm({ user, profile, countries }: Props) {
  const { supabase } = useSupabase();

  const [username, setUsername] = useState<string | null>(profile.username);
  const [email, setEmail] = useState<string | null>(user?.email!);
  const [fullName, setFullName] = useState<string | null>(profile.full_name);
  const [country, setCountry] = useState<number | null>(profile.country);
  const [biography, setBiography] = useState<string | null>(profile.biography);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const editProfile = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      setError(null);
      setSuccess(null);

      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          full_name: fullName,
          country,
          biography,
          updated_at: new Date().toUTCString()
        })
        .eq('id', user?.id);

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess('Profile updated successfully!');
    },
    [username, email, fullName, country, biography, setError, setSuccess]
  );

  return (
    <>
      {error && <Error error={error} />}

      {success && <Success success={success} />}

      <form
        className="flex flex-col gap-4 w-full"
        id="profile-form"
        onSubmit={editProfile}
      >
        <div className="flex flex-row gap-40 items-center w-3/4">
          <label className="block mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow-sm appearance-none border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            required
            minLength={3}
            maxLength={32}
            pattern="^[a-zA-Z0-9_.-]+$"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            value={username || ''}
          />
        </div>

        <hr />

        <div className="flex flex-row gap-40 items-center w-3/4">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow-sm appearance-none cursor-not-allowed border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            required
            minLength={8}
            maxLength={64}
            disabled
            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
            onChange={(event) => setEmail(event.target.value)}
            value={email || ''}
          />
        </div>

        <hr />

        <div className="flex flex-row gap-40 items-center w-3/4">
          <label className="block mb-2" htmlFor="fullname">
            Full Name
          </label>
          <input
            className="shadow-sm appearance-none border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullname"
            name="fullname"
            type="text"
            required
            minLength={3}
            maxLength={128}
            placeholder="Full Name"
            onChange={(event) => setFullName(event.target.value)}
            value={fullName || ''}
          />
        </div>

        <hr />

        <div className="flex flex-row gap-40 items-center w-3/4">
          <label className="block mb-2" htmlFor="avatar">
            Avatar
          </label>

          <AvatarInput avatar_url={profile.avatar_url} setError={setError} setSuccess={setSuccess} />
        </div>

        <hr />

        <div className="flex flex-row gap-40 items-center w-3/4">
          <label className="block mb-2" htmlFor="biography">
            Biography
          </label>
          <textarea
            className="shadow-sm appearance-none border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="biography"
            name="biography"
            required
            minLength={3}
            maxLength={512}
            placeholder="Biography"
            onChange={(event) => setBiography(event.target.value)}
            value={biography || ''}
          />
        </div>

        <hr />

        <div className="flex flex-row gap-40 items-center w-3/4">
          <label className="block mb-2" htmlFor="country">
            Country
          </label>
          <select
            className="shadow-sm border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            name="country"
            required
            onChange={(event) => setCountry(parseInt(event.target.value))}
            value={country || 0}
          >
            {countries.map((item) => (
              <option key={item.name} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
}
