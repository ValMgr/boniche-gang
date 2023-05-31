import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import { Database } from '@/types/database.types';
import Button from '@/core/components/Button';

interface Props {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: event, error } = await supabase
    .from('events')
    .select('*, category(name)')
    .eq('id', params.id)
    .single();

  if (error) {
    console.error(error);
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-medium tracking-tight">
          Event N°{params.id}
        </h1>
        <hr className="my-8" />
        <p className="text-xl">Error: Event not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between w-full content-center">
        <h1 className="text-3xl font-medium tracking-tight">
          Event N°{params.id}
        </h1>

        <div className="flex flex-row">
          <Button style='secondary' disabled>Delete</Button>
        </div>
      </div>
      <hr className="my-8" />
      <h2 className="text-xl mb-1 font-medium tracking-tight">{event.name}</h2>
      <p className='text-sm mb-4 italic'>{(event.category as {name: string}).name}</p>

      <div className="w-full flex flew-row gap-2">

        <div className='w-2/3'>
          <p>{event.description}</p>
        </div>

        <img src={event.thumbnail!} alt={event?.name} className='w-1/3 rounded-md shadow-md' />
      </div>

      <hr className="my-12" />

      <div className="flex flex-row justify-between">
        <p>Location: {event.location ?? '-'}</p>
        <p>Start date: {new Date(event?.start_date as string).toUTCString()}</p>
        <p>End date: {new Date(event?.end_date as string).toUTCString()}</p>
      </div>
    </div>
  );
}
