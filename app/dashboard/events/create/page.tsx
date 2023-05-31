import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import Button from '@/core/components/Button';
import CreateEventForm from '@/dashboard/components/CreateEventForm';
import { Database } from '@/types/database.types';

export default async function CreateEvent() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  }); 

  const { data: events_categories, error } = await supabase.from('event_category').select('*');

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="flex flex-row-reverse w-full">
        <Button href="/dashboard/events">Back</Button>
      </div>
      <CreateEventForm categories={events_categories} />
    </>
  );
}
