import React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, today } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

import FondCaisseModal from './fond-caisse-modal';

const DATA = [
  {
    id: 266,
    date: today(),
    user: 'Wissem',
    amount: 500,
  },
];
export default function FondTableView() {
  const openFond = useBoolean();
  const edit = useBoolean();
  return (
    <>
      <Card>
        <CardHeader
          title="Fond de la caisse"
          action={
            <Button
              color="primary"
              onClick={() => openFond.onTrue()}
              variant="contained"
              startIcon={<Iconify icon="material-symbols:add-rounded" />}
            >
              Fond de caisse
            </Button>
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell />
            </TableHead>
            <TableBody>
              {DATA.map((row) => (
                <>
                  <TableRow key={row.id}>
                    <TableCell>#{row.id}</TableCell>
                    <TableCell>{fDate(row.date)}</TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{fCurrency(row.amount)}</TableCell>
                    <TableCell>
                      <Fab size='small' variant="contained" color="warning" onClick={edit.onTrue}>
                        <Iconify icon="material-symbols:edit-outline" />
                      </Fab>
                    </TableCell>
                  </TableRow>
                  <FondCaisseModal open={edit.value} onClose={edit.onFalse} currentFond={row} />
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <FondCaisseModal open={openFond.value} onClose={openFond.onFalse} />
    </>
  );
}
