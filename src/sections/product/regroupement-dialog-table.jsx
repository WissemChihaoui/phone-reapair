import React from 'react';

import {
  Table,
  Button,
  Dialog,
  TableRow,
  TableBody,
  TableCell,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/format-number';

import { TableHeadCustom } from 'src/components/table';

const TABLE_HEAD = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Article' },
  { id: 'price', label: 'Prix TTC' },
  { id: 'price_sell', label: "Prix d'achat" },
];

export default function RegroupementDialogTable({ open, onClose, TableData }) {
    const router =useRouter()
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Les piéces associées à cette regroupement</DialogTitle>
      <DialogContent>
        
          <Table>
            <TableHeadCustom headLabel={TABLE_HEAD} />

            <TableBody>
              {TableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{fCurrency(row.price)}</TableCell>
                  <TableCell>{fCurrency(row.price_sell)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </DialogContent>
      <DialogActions>
        <Button variant="link" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="contained" color="primary">
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}
