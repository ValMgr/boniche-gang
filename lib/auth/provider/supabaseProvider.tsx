'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  Session,
  User,
  createBrowserSupabaseClient
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
  user: User | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    (async () => {
      const _session = (await supabase.auth.getSession()).data.session;
      if (_session) {
        setSession(_session);
        setUser(_session.user);
      }
    })();

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session, user }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
