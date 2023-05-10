'use client';

import { useState } from 'react';

import { useSupabase } from '@/auth/provider/supabaseProvider';
import Link from '@/core/components/Link';
import Button from '@/core/components/Button';

export default function RegisterForm() {
  const { supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordConfirmation = formData.get('passwordConfirmation') as string;

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
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
        <p className="text-xs italic">
          Password need to be at least 8 characters long, contain at least one
          number, one lowercase letter, one uppercase letter and one special
          character.
        </p>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="passwordConfirmation"
        >
          Password Confirmation
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          required
          minLength={8}
          maxLength={64}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$"
          placeholder="******************"
        />
      </div>
      <div className="flex items-center justify-between">
        <Button style="primary" type="submit">
          Register
        </Button>

        <Link href="/login">Already have an account?</Link>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
          You have been registered successfully. Please check your email to
          verify your account.
        </div>
      )}
    </form>
  );
}
