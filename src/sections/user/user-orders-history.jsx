import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { fCurrency } from 'src/utils/format-number';
import { fDate, today } from 'src/utils/format-time';

const TABLE_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'order', label: 'Num Commande', align: 'right' },
  { id: 'client', label: 'Client', align: 'right' },
  { id: 'product', label: 'Produit', align: 'right' },
  { id: 'statut', label: 'Statut', align: 'right' },
  { id: 'estimation', label: 'Estimation Prix', align: 'right' },
  { id: 'date', label: 'Date', align: 'right' },
];

const EXAMPLE_DATA = [
    {
        id: 1,
        order: '5228',
        client: 'Wissem Chihaoui',
        product: 'Iphone 11',
        statut: 'intervention payée et clôturée (archivée)',
        estimation: 29,
        date: today()
    }
]
export default function UserOrdersHistory({ history, open, onClose }) {
  return (
    <Dialog maxWidth="lg" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Historique des commandes</DialogTitle>
      <DialogContent>
        <Table>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
              {EXAMPLE_DATA?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="right">{row.order}</TableCell>
                  <TableCell align="right">{row.client}</TableCell>
                  <TableCell align="right">{row.product}</TableCell>
                  <TableCell align="right">{row.statut}</TableCell>
                  <TableCell align="right">{fCurrency(row.estimation)}</TableCell>
                  <TableCell align="right">{fDate(row.date)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Stack>
            <Button variant='contained' onClick={onClose}>Fermer</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
