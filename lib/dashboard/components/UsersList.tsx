'use client';

import { useCallback, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Card
} from '@tremor/react';
import { User } from '@supabase/auth-helpers-nextjs';

import Button from '@/core/components/Button';
import { useSupabase } from '@/auth/provider/SupabaseProvider';
import Error from '@/core/components/Error';
import Success from '@/core/components/Success';

interface Props {
  profiles: any[];
}

export default function UsersList({ profiles }: Props) {
  const { supabase } = useSupabase();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const roles = profiles.map((profile) => ({
    id: profile.id,
    role: profile.permissions.role
  }));

  const handleSave = useCallback(async () => {
    setError(null);
    setSuccess(null);

    const rolesDiff = profiles.map((profile, index) => ({
      id: profile.id,
      role: (document.getElementById(`roles_${index}`) as HTMLSelectElement)
        .value
    }));

    const rolesToUpdate = rolesDiff.filter((role) => {
      const roleToUpdate = roles.find((r) => r.id === role.id);
      return roleToUpdate?.role !== role.role;
    });

    if (rolesToUpdate.length === 0) {
      setError('No changes to save');
      return;
    }

    const updates = rolesToUpdate.map(
      async (role) =>
        new Promise((resolve, reject) => {
          supabase
            .from('roles')
            .update({ role: role.role })
            .eq('id', role.id)
            .then(({ error }) => {
              if (error) {
                reject(error);
                return;
              }

              resolve(true);
            });
        })
    );

    try {
      await Promise.all(updates);
      setSuccess('Roles updated successfully');
    } catch (error) {
      setError((error as Error).message);
    }
  }, [roles]);

  return (
    <>
      <div className="flex flex-row-reverse w-full">
        <Button style="secondary" onClick={handleSave}>
          Save
        </Button>
      </div>

      {error && <Error error={error} />}

      {success && <Success success={success} />}

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Username</TableHeaderCell>
              <TableHeaderCell>Fullname</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Created at</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile, index) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.username || '-'}</TableCell>
                <TableCell>{profile.full_name || '-'}</TableCell>
                <TableCell>{(profile.user as User).email}</TableCell>
                <TableCell>
                  <select
                    name={`roles_${index}`}
                    id={`roles_${index}`}
                    disabled={profile.permissions.role === 'admin'}
                    defaultValue={profile.permissions.role}
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                    <option value="guest">Guest</option>
                  </select>
                </TableCell>
                <TableCell>
                  {new Date(
                    (profile.user as User).created_at as string
                  ).toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
