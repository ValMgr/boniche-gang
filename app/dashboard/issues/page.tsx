import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import { Database } from '@/types/database.types';
import TableIssues from '@/dashboard/components/TableIssues';

export default async function Issues() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: issues, error } = await supabase.from('issues').select('*');

  if (error) {
    console.error(error);
  }

  if (!issues) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-medium tracking-tight">Issues</h1>
        <hr className="my-8" />
        <p className="text-xl">No issues found.</p>
      </div>
    )
  }

  return <TableIssues issues={issues} />
}
