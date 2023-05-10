'use client';

import { useEffect, useState } from 'react';

import { useSupabase } from '@/auth/provider/SupabaseProvider';

export default function ProfileForm() {
  const { supabase, user } = useSupabase();

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [biography, setBiography] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [countryList, setCountryList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (user?.email) {
        setEmail(user.email);
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error || !profile) {
        console.error(error);
        return;
      }

      setUsername(profile.username);
      setFullName(profile.full_name);
    })();

    (async () => {
      const { data: countries, error } = await supabase
        .from('countries')
        .select('name')
        .order('name', { ascending: true });

      if (error || !countries) {
        console.error(error);
        return;
      }

      setCountryList(countries.map((country) => country.name as string));
    })();
  }, [supabase, user]);

  return (
    <form className="flex flex-col gap-4 w-full">
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
          className="shadow-sm appearance-none border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          pattern="^[a-zA-Z0-9_.-]+$"
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

        <div>Avatar input</div>
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
        />
      </div>

      <hr />

      <div className="flex flex-row gap-40 items-center w-3/4">
        <label className="block mb-2" htmlFor="country">
          Country
        </label>
        <select className="shadow-sm appearance-none border rounded-md w-80 ml-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {countryList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
