import { headers, cookies } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
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

  const { data: users, error: user_err } = await supabase
    .from('users')
    .select('*');
  const { data: profiles, error: profile_err } = await supabase
    .from('profiles')
    .select('*');

  if (user_err || profile_err) {
    console.error(user_err || profile_err);
    return (
      <div className="text-red-500 background-red-100">
        Error fetching users
      </div>
    );
  }

  if (!users || !profiles) {
    return <div>No users found</div>;
  }

  const usersWithProfiles = users.map((user) => {
    const profile = profiles?.find((profile) => profile.id === user.id);
    return { ...user, ...profile };
  });

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
          {usersWithProfiles.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{new Date(user.updated_at as string).toDateString()}</TableCell>
              <TableCell>{new Date(user.created_at as string).toDateString()}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
