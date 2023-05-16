'use client';

import { useCallback, useState } from 'react';
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { useRouter } from 'next/navigation';

import Button from '@/core/components/Button';
import { useSupabase } from '@/auth/provider/SupabaseProvider';
import Error from '@/core/components/Error';

export default function CreateEventForm() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [value, setValue] = useState<DateRangePickerValue>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const start_date = value[0] as Date;
    const end_date = value[1] as Date;
    const thumbnail = formData.get('thumbnail') as File;

    const thumb_path_ext = thumbnail.name.split('.').pop();
    const thumb_path = `events/${name.replace(/\s/g, '_')}.${thumb_path_ext}`;

    const { data: uploaded_thumb, error: storage_error} = await supabase.storage.from('thumbnails').upload(thumb_path, thumbnail);

    if (storage_error) {
      setError(storage_error.message);
      return;
    }

    const { error } = await supabase.from('events').insert({
      name,
      description,
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
      thumbnail: supabase.storage.from('thumbnails').getPublicUrl(uploaded_thumb.path).data.publicUrl,
      location
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard/events');

  }, [value]);


  return (
    <>
      {error && <Error error={error} />}

    <form className="bg-white shadow-lg w-full rounded-lg px-8 pt-6 pb-8 mb-4 mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name of the event"
          name="name"
          id="name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="start_date"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Start Date
        </label>
        <DateRangePicker className="shadow" value={value} onValueChange={setValue} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          id="description"
          placeholder="Description of the event"
          rows={8}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="location"
          placeholder="Location of the event"
          id="location"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Image
        </label>
        <input
          className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10
          file:bg-transparent file:border-0
          file:bg-gray-200 file:mr-4
          file:py-3 file:px-4"
          aria-describedby="file_input_help"
          id="file_input"
          name="thumbnail"
          type="file"
        />
      </div>
      <div className="mb-4">
        <Button type="submit">
          Create Event
        </Button>
      </div>
    </form>
    </>
  );
}
