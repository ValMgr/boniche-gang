'use client';

import { DonutChart, Title, Card, Legend } from '@tremor/react';

interface Props {
  roles: {
    role: string | null;
  }[];
}

export default function UsersOverview({ roles }: Props) {
  const data = [
    {
      label: 'Admin',
      value: roles.filter((role) => role.role === 'admin').length
    },
    {
      label: 'Members',
      value: roles.filter((role) => role.role === 'member').length
    },
    {
      label: 'Guests',
      value: roles.filter((role) => role.role === 'guest').length
    }
  ];

  if (roles.length === 0) {
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
        colors={['amber', 'green', 'indigo']}
        className='mb-4'
      />
      <Legend
        categories={['Admin', 'Members', 'Guest']}
        colors={['amber', 'green', 'indigo']}
      />
    </Card>
  );
}
