'use client';

import { useState } from 'react';
import { useSupabase } from '@/auth/provider/supabase-provider';

export default function LoginForm() {
  const { supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
      return;
    }

    window.location.href = '/profile';
  };

  return (
    <form
      className="bg-white shadow-lg w-full rounded-lg px-8 pt-6 pb-8 mb-4 mt-8"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="text"
          required
          minLength={8}
          maxLength={64}
          pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={64}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$"
          placeholder="******************"
        />  
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login in
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/register"
        >
          Create an account?
        </a>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {error}
        </div>
      )}
    </form>
  );
}
