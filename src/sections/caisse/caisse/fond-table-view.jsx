import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { fCurrency } from 'src/utils/format-number';
import { fDate, today } from 'src/utils/format-time';


const DATA = [
    {
        id: 266,
        date: today(),
        user: 'Wissem',
        amount: 500
    }
]
export default function FondTableView() {
  return (
    <>
      <Card>
        <CardHeader title="Fond de la caisse" />
        <CardContent>
          <Table>
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Montant</TableCell>
            </TableHead>
            <TableBody>
              {DATA.map((row) => (
                <TableRow key={row.id}>
                <TableCell>#{row.id}</TableCell>
                <TableCell>{fDate(row.date)}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{fCurrency(row.amount)}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
