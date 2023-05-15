import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { Card, Grid, Title } from '@tremor/react';

import { Database } from '@/types/database.types';
import UsersOverview from '@/dashboard/components/UsersOverview';

export default async function Overview() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: users, error } = await supabase
    .from('users')
    .select('email, role');

  if (error) {
    console.error(error);
  }

  return (
    <Grid className="mt-4 gap-5 w-full" numCols={1} numColsMd={2} numColsLg={2}>
      {users && <UsersOverview users={users} />}

      <Card>
        <Title> Events </Title>
      </Card>

      <Card>
        <Title> Products </Title>
      </Card>

      <Card>
        <Title> Servers </Title>
      </Card>
    </Grid>
  );
}
