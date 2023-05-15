import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import { Database } from '@/types/database.types';
import IssueMenu from '@/dashboard/components/IssueMenu';

interface Props {
  params: {
    id: string;
  };
}

export default async function IssueDetails({ params }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { id } = params;
  const { data: issue, error } = await supabase
    .from('issues')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-medium tracking-tight">Issue Details</h1>
        <hr className="my-8" />
        <p className="text-xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between w-full content-center">
        <h1 className="text-3xl font-medium tracking-tight">Issue N°{id} - {issue?.type.toUpperCase()}</h1>

        <IssueMenu id={id} status="In Progress" />
      </div>
      <hr className="my-8" />
      <h2 className="text-xl font-medium tracking-tight">{issue?.title}</h2>
      <p>
        {issue?.description}
      </p>

      <hr className='my-12' />
      <div className="flex flex-row justify-between">
        <p>Contact: {issue?.contact ?? '-'}</p>
        <p>Created at: {new Date(issue?.created_at as string).toUTCString()}</p>
      </div>
    </div>
  );
}
