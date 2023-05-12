'use client';

import { useCallback, useEffect, useState } from 'react';

import Button from '@/core/components/Button';
import { useSupabase } from '@/auth/provider/SupabaseProvider';

export default function AvatarInput() {
  const { supabase, user } = useSupabase();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string>('');

  const deleteAvatar = useCallback(async () => {
    if (!currentAvatar) return;

    await supabase.storage.from('avatars').remove([currentAvatar]);
  }, [currentAvatar]);

  const updateAvatar = useCallback(async () => {
    if (avatar === null) return;

    if (currentAvatar) await supabase.storage.from('avatars').remove([currentAvatar]);

    const extension = avatar.name.split('.').pop();
    const filename = `${user?.id}.${extension}`;

    const { error } = await supabase.storage.from('avatars').upload(filename, avatar);

    if (error) {
      console.error(error);
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ avatar_url: supabase.storage.from('avatars').getPublicUrl(filename).data.publicUrl })
      .eq('id', user?.id);

      setCurrentAvatar(supabase.storage.from('avatars').getPublicUrl(filename).data.publicUrl);

    if (profileError) {
      console.error(profileError);
      return;
    }

  }, [avatar, currentAvatar]);

  useEffect(() => {
    (async () => {
      if (user === null) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        console.error(error);
        return;
      }

      setCurrentAvatar(profile.avatar_url!);
    })();
  }, [user]);

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="relative">
        <input
          type="file"
          className="w-full h-full opacity-0 cursor-pointer z-10 absolute left-0 top-0"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files?.[0]!)}
        />

        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            className="w-16 h-16 rounded-full"
          />
        )}

        {!avatar && currentAvatar && (
          <img src={currentAvatar} className="w-16 h-16 rounded-full" />
        )}

        {!avatar && !currentAvatar && (
          <div className="relative w-16 h-16 overflow-hidden bg-gray-200 rounded-full">
            <svg
              className="absolute w-16 h-16 -bottom-2 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>

      <div className="flex gap-4 flex-row">
        <Button style="link" onClick={deleteAvatar} disabled={!currentAvatar}>
          Remove
        </Button>
        <Button style="link" onClick={updateAvatar}>
          Update
        </Button>
      </div>
    </div>
  );
}
