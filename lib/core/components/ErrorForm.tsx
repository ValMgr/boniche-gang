'use client';

import { useState } from 'react';

import { useSupabase } from '@/auth/provider/SupabaseProvider';
import Button from '@/core/components/Button';
import Error from '@/core/components/Error';
import Success from '@/core/components/Success';

export default function ErrorForm() {
  const { supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const contact = formData.get('contact') as string;

    const { error } = await supabase.from('issues').insert({
      title,
      type,
      description,
      contact: contact || null
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('Your issue has been reported!');
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white p-4 mt-8 shadow-lg rounded-lg"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          name="title"
          type="text"
          required
          minLength={8}
          maxLength={64}
          placeholder="Title"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="type"
        >
          Type
        </label>
        <select
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="type"
          name="type"
          required
        >
          <option value="ui">UX - UI</option>
          <option value="wording">Wording</option>
          <option value="authentification">Authentification</option>
          <option value="marketplace">Marketplace</option>
          <option value="account">Account</option>
          <option value="performance">Performance</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          id="description"
          name="description"
          required
          minLength={8}
          maxLength={512}
          placeholder="Describe the error"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="contact"
        >
          Contact (optional)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="contact"
          name="contact"
          type="email"
          minLength={8}
          maxLength={64}
          placeholder="Email"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button style="primary" type="submit" disabled={!!success}>
          Report
        </Button>
      </div>

      {error && <Error error={error} />}

      {success && <Success success={success} />}
    </form>
  );
}
