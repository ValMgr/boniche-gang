'use client';

import Button from '@/core/components/Button';
import { Badge } from '@tremor/react';

interface Props {
  id: string;
  status: string;
}

export default function IssueMenu({ id, status }: Props) {
  return (
    <div className="flex flex-row gap-4">
      <Badge size="sm">{status}</Badge>

      <Button style="secondary" disabled={true}>Close</Button>

      <Button style="primary" disabled={true}>Delete</Button>
    </div>
  );
}
