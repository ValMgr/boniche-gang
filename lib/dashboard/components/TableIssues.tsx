'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeaderCell,
  Badge
} from '@tremor/react';
import { MdOutlinePreview } from 'react-icons/md';

import { Issues } from '@/types/database.types';
import Link from '@/core/components/Link';

interface Props {
  issues: Issues[];
}

export default function TableIssues({ issues }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Issue</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Contact</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Details</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.id}</TableCell>
            <TableCell>{issue.title}</TableCell>
            <TableCell>{issue.type.toUpperCase()}</TableCell>
            <TableCell>{issue.contact}</TableCell>
            <TableCell>
              <Badge size="sm">In Progress</Badge>
            </TableCell>
            <TableCell className='flex justify-center'>
              <Link href={`/dashboard/issues/${issue.id}`}>
                <MdOutlinePreview size="24" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
