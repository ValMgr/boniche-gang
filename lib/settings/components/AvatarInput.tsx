'use client';

import { useCallback, useState, MouseEvent } from 'react';

import Button from '@/core/components/Button';
import { useSupabase } from '@/auth/provider/SupabaseProvider';

interface Props {
  avatar_url: string | null;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

export default function AvatarInput({ avatar_url, setError, setSuccess }: Props) {
  const { supabase, user } = useSupabase();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string>(avatar_url || '');

  const deleteAvatar = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentAvatar) return;

    const currentPath = currentAvatar.split('/').pop() as string;
    const { error } = await supabase.storage.from('avatars').remove([currentPath]);

    if (error) {
      setError(error.message);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').update({
      avatar_url: null
    }).eq('id', user?.id);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    setCurrentAvatar('');
    setSuccess('Avatar removed');
  }, [currentAvatar, user]);

  const updateAvatar = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (avatar === null) return;

    if (currentAvatar) {
      const currentPath = currentAvatar.split('/').pop() as string;
      const {error } = await supabase.storage.from('avatars').remove([currentPath]);

      if (error) {
        setError(error.message);
        return;
      }
    }

    const extension = avatar.name.split('.').pop();
    const filename = `${user?.id}_${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filename, avatar);

    if (error) {
      setError(error.message);
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        avatar_url: supabase.storage.from('avatars').getPublicUrl(filename).data
          .publicUrl
      })
      .eq('id', user?.id);

    setCurrentAvatar(
      supabase.storage.from('avatars').getPublicUrl(filename).data.publicUrl
    );

    if (profileError) {
      setError(profileError.message);
      return;
    }

    setSuccess('Avatar updated');
  }, [avatar, currentAvatar]);

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="relative cursor-pointer">
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

        {!avatar && currentAvatar !== '' && (
          <img src={currentAvatar} className="w-16 h-16 rounded-full" />
        )}

        {!avatar && currentAvatar === '' && (
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
