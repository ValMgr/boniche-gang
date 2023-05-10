'use client';

import React from 'react';
import { revalidatePath } from 'next/cache';

import Button from '@/core/components/Button';
import { useSupabase } from '@/auth/provider/supabaseProvider';

export default function Logout() {
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    revalidatePath('/');
  };

  return (
    <Button style="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
