import { Card, Table, TableBody, TableHead, TableHeaderCell, TableRow, TableCell } from '@tremor/react';
import { BiEdit } from 'react-icons/bi';

import { Events } from '@/types/database.types';

interface Props {
  events: Events[];
}

export default function EventsList({ events }: Props) {


  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Start Date</TableHeaderCell>
            <TableHeaderCell>End Date</TableHeaderCell>
            <TableHeaderCell>Details</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.id}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{new Date(event.start_date).toDateString()}</TableCell>
              <TableCell>{new Date(event.end_date!).toDateString()}</TableCell>
              <TableCell>
                <a href={`/dashboard/events/${event.id}`}>
                  <BiEdit size="20" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
