'use client';

import { DonutChart, Title, Card } from '@tremor/react';

interface Props {
  users: {
    email: string | null;
    role: string | null;
  }[];
}

export default function UsersOverview({ users }: Props) {
  const data = [
    {
      label: 'Admin',
      value: users.filter((user) => user.role === 'admin').length
    },
    {
      label: 'Members',
      value: users.filter((user) => user.role === 'member').length
    },
    {
      label: 'Guests',
      value: users.filter((user) => user.role === 'authenticated').length
    }
  ];

  if (users.length === 0) {
    return (
      <Card>
        <Title> Users </Title>
        <p> No users found. </p>
      </Card>
    );
  }

  return (
    <Card>
      <Title> Users </Title>
      <DonutChart
        data={data}
        index="label"
        category="value"
        showLabel={true}
      />
    </Card>
  );
}
