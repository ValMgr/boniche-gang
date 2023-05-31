import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { Card, Grid, Title } from '@tremor/react';

import { Database } from '@/types/database.types';
import UsersOverview from '@/dashboard/components/UsersOverview';
import EventsOverview from '@/dashboard/components/EventsOverview';

export default async function Overview() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: roles, error: roles_error } = await supabase
    .from('roles')
    .select('role');

  const { data: events, error: events_error } = await supabase.from('events').select('category(name)')

  if (roles_error || events_error) {
    console.error(roles_error || events_error);
  }

  return (
    <Grid className="mt-4 gap-5 w-full" numCols={1} numColsMd={2} numColsLg={2}>
      {roles && <UsersOverview roles={roles} />}

      {events && <EventsOverview events={(events as { category: {name: string} | null }[])} />}

      <Card>
        <Title> Products </Title>
      </Card>

      <Card>
        <Title> Servers </Title>
      </Card>
    </Grid>
  );
}
