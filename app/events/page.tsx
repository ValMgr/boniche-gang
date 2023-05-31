import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { MdLocationOn } from 'react-icons/md';

import { Database } from '@/types/database.types';
import { Grid } from '@tremor/react';

export default async function Events() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: events, error } = await supabase.from('events').select('*');

  if (error || !events) {
    console.error(error);
    return (
      <div className="text-red-500 bg-red-100 rounded-lg p-4">
        Error fetching events
      </div>
    );
  }

  console.log(events[0].start_date, new Date(events[0].start_date).getDate());

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold">Our Events</h1>
      <Grid className="mt-4 gap-5" numColsMd={4} numCols={1}>
        {events.map((event) => (
          <a
            href={`/events/${event.id}`}
            key={event.id}
            className="flex flex-col rounded-lg shadow-lg border border-gray-200"
          >
            <img
              src={event.thumbnail!}
              alt={event.name}
              className="rounded-t-lg flex-1 object-fill"
            />
            <div className="flex flex-row p-4 gap-4">
              <div className="flex flex-col">
                <div className="flex flex-col justify-center items-center">
                  <span className="text-xl font-bold">
                    {new Date(event.start_date).getDate()}
                  </span>
                  <span className="text-sm capitalize">
                    {new Date(event.start_date).toLocaleString('default', {
                      month: 'short'
                    })}
                  </span>
                </div>
                {event.end_date && (
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-xl font-bold">
                      {new Date(event.end_date).getDate()}
                    </span>
                    <span className="text-sm capitalize">
                      {new Date(event.end_date).toLocaleString('default', {
                        month: 'short'
                      })}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <h2 className="text-lg font-bold">{event.name}</h2>
                <p className="flex flex-row gap-2 pt-2 items-center"><MdLocationOn /> {event.location}</p>
              </div>
            </div>
          </a>
        ))}
      </Grid>
    </div>
  );
}
