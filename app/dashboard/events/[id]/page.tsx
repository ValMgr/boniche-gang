import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

import ComingSoon from '@/core/components/ComingSoon'
import { Database } from '@/types/database.types';

export default function EventPage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  return (
    <div>
      
    </div>
  )
}
