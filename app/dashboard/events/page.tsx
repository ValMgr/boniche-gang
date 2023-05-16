import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/database.types';
import { Card, Title } from '@tremor/react';
import Button from '@/core/components/Button';
import EventsList from '@/dashboard/components/EventsList';

export default async function Events() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: events, error: events_err } = await supabase
    .from('events')
    .select('*');

  if (events_err) {
    console.error(events_err);
    return (
      <Card>
        <Title>Error fetching events</Title>
      </Card>
    );
  }

  if (!events || events.length === 0) {
    return (
      <>
        <div className="flex justify-end w-full">
          <Button href="/dashboard/events/create">Create event</Button>
        </div>
        <Card className="text-center">
          <Title>No events found</Title>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end w-full">
        <Button href="/dashboard/events/create">Create event</Button>
      </div>
      <EventsList events={events} />
    </>
  );
}
