import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types/database.types';

const adminRoutes = ['/dashboard/users', '/dashboard/issues'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  await supabase.auth.getSession();

  const { data: permission } = await supabase
    .from('roles')
    .select('role')
    .eq('id', (await supabase.auth.getUser()).data.user?.id)
    .single();

  if (!permission) {
    return NextResponse.next();
  }

  if (
    permission?.role !== 'member' &&
    permission?.role !== 'admin' &&
    req.nextUrl.pathname.startsWith('/dashboard') &&
    req.nextUrl.pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    permission?.role !== 'admin' &&
    adminRoutes.includes(req.nextUrl.pathname) &&
    req.nextUrl.pathname !== '/dashboard/overview'
  ) {
    return NextResponse.redirect(new URL('/dashboard/overview', req.url));
  }

  return NextResponse.next();
}
