'use client';

import React from 'react';

import Button from '@/core/components/Button';
import { useSupabase } from '@/auth/provider/supabase-provider';

export default function Logout() {
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button style="link" onClick={handleLogout}>
      Logout
    </Button>
  );
}
