import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { MdLocationOn } from 'react-icons/md';

import { Database } from '@/types/database.types';
import ComingSoon from '@/core/components/ComingSoon';

interface Props {
  params: {
    id: string;
  };
}

export default async function Event({ params }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !event) {
    return (
      <div className="text-red-500 bg-red-100 rounded-lg p-4">
        Error fetching event
      </div>
    );
  }

  return (
    <article>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">{event.name}</h1>

          <p className="flex flex-row gap-2">
            <MdLocationOn /> {event.location}
          </p>
        </div>

        <div className="flex flew-row gap-4">
          <div className="flex flex-col justify-center items-center">
            <span className="text-4xl font-bold">
              {new Date(event.start_date).getDate()}
            </span>
            <span className="text-base capitalize">
              {new Date(event.start_date).toLocaleString('default', {
                month: 'short'
              })}
            </span>
          </div>
          {event.end_date && (
            <div className="flex flex-col justify-center items-center">
              <span className="text-4xl font-bold">
                {new Date(event.end_date).getDate()}
              </span>
              <span className="text-base capitalize">
                {new Date(event.end_date).toLocaleString('default', {
                  month: 'short'
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <hr className="my-4" />

      <img
        src={event.cover!}
        alt={event.name}
        className="mt-4 w-full rounded h-96 object-center"
      />

      <hr className="my-4" />

      <div className="flex gap-10 justify-end">
        <div className="w-2/5 p-6 mt-4 rounded-md border-gray-200 border">
          <p>{event.description}</p>
        </div>

        <div className="w-2/5 p-6">
          <h2 className="text-xl font-bold">Comments</h2>

          <div className="mt-4">
            <ComingSoon />
          </div>
        </div>
      </div>
    </article>
  );
}
