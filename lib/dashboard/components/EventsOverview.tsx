import { Events } from '@/types/database.types';
import { Card, DonutChart, Legend, Title } from '@tremor/react';

interface Props {
  events: {
    category: { name: string } | null;
  }[];
}

export default function EventsOverview({ events }: Props) {
  const categories = events.map((event) =>
    event.category ? event.category.name : 'No category'
  );
  const uniqueCategories = [...new Set(categories)];

  const data = uniqueCategories.map((category) => {
    return {
      label: category,
      value: categories.filter((c) => c === category).length
    };
  });

  if (events.length === 0) {
    return (
      <Card>
        <Title> Events </Title>
        <p> No events found. </p>
      </Card>
    );
  }

  return (
    <Card>
      <Title> Events </Title>
      <DonutChart
        data={data}
        index="label"
        category="value"
        showLabel={true}
        className='mb-4'
      />
      <Legend
        categories={uniqueCategories}
      />
    </Card>
  );
}
