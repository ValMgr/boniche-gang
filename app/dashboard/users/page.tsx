import { headers, cookies } from 'next/headers';
import {
  User,
  createServerComponentSupabaseClient
} from '@supabase/auth-helpers-nextjs';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Card
} from '@tremor/react';

import { Database } from '@/types/database.types';

export default async function Users() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies
  });

  const { data: profiles, error: profile_err } = await supabase
    .from('profiles')
    .select('*, user:users(*)');

  if (profile_err) {
    console.error(profile_err);
    return (
      <div className="text-red-500 bg-red-100 rounded-lg p-4">
        Error fetching users
      </div>
    );
  }

  if (!profiles) {
    return <div>No users found</div>;
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Username</TableHeaderCell>
            <TableHeaderCell>Fullname</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Updated at</TableHeaderCell>
            <TableHeaderCell>Created at</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell>{profile.username}</TableCell>
              <TableCell>{profile.full_name}</TableCell>
              <TableCell>{(profile.user as User).email}</TableCell>
              <TableCell>{(profile.user as User).role}</TableCell>
              <TableCell>
                {new Date(profile.updated_at as string).toDateString()}
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
  );
}
