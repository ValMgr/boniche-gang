'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSupabase } from '@/auth/provider/SupabaseProvider';
import AvatarInput from '@/settings/components/AvatarInput';

export default function ProfileForm() {
  const { supabase, user } = useSupabase();

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [country, setCountry] = useState<number>(-1);
  const [biography, setBiography] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [countryList, setCountryList] = useState<
    { id: number; name: string | null }[]
  >([]);

  const editProfile = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      console.log('update profile');

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

      setSuccess(true);
    },
    [username, email, fullName, country, biography, setError, setSuccess]
  );

  useEffect(() => {
    (async () => {
      if (user === null || !loading) {
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        console.error(error);
        return;
      }

      setEmail(user.email!);
      setUsername(profile.username);
      setFullName(profile.full_name);
      setCountry(profile.country!);
      setBiography(profile.biography);
      setLoading(false);
    })();

    (async () => {
      if (countryList.length !== 0) return;

      const { data: countries, error } = await supabase
        .from('countries')
        .select('id,name')
        .order('name', { ascending: true });

      if (error || !countries) {
        console.error(error);
        return;
      }

      setCountryList(countries);
    })();
  }, [supabase, user]);

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          Profile updated successfully!
        </div>
      )}

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

          <AvatarInput />
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
            value={country}
          >
            {countryList.map((item) => (
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
