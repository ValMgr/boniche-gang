'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database.types'

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: Promise<Session | null>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [session] = useState(() => supabase.auth.getSession().then((res) => res.data.session));
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}
