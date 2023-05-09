import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types/database.types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const session = await supabase.auth.getSession();

  if (
    !session.data.session?.user &&
    (req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname.startsWith('/dashboard'))
  ) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return res;
}
