import {
  Avatar,
  Badge,
  badgeClasses,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { fCurrency } from 'src/utils/format-number';
import { fDate, today } from 'src/utils/format-time';
import AddDepotModal from './add-depot-modal';

const DATA = [
  {
    id: 1,
    date: today(),
    user: 'Wissem',
    amount: 500,
    comment: 'Coffée',
    type: 'Espèce',
    action: 'Send',
  },
];
export default function DepotTableView() {

    const add = useBoolean()
  return (
    <>
      <Card>
        <CardHeader
          title="Dépot / Retrait"
          action={
            <Button color='primary' onClick={()=> add.onTrue()} variant="contained" startIcon={<Iconify icon="material-symbols:add-rounded" />}>
              Ajouter dépot / retrait
            </Button>
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Dépôt/Retrait</TableCell>
              <TableCell>Type</TableCell>
            </TableHead>
            {DATA.map((row) => (
              <TableRow key={row.id}>
                <TableCell>#{row.id}</TableCell>
                <TableCell>
                    {fDate(row.date)}
                </TableCell>
                <TableCell>
                    {row.user}
                </TableCell>
                <TableCell>
                  <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ position: 'relative' }}>
                        <Badge
                          overlap="circular"
                          color={row.action === 'Send' ? 'success' : 'error'}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <Iconify
                              icon={
                                row.action === 'Send'
                                  ? 'eva:diagonal-arrow-left-down-fill'
                                  : 'eva:diagonal-arrow-right-up-fill'
                              }
                              width={16}
                            />
                          }
                          sx={{ [`& .${badgeClasses.badge}`]: { p: 0, width: 20 } }}
                        />
                      </Box>
                      <ListItemText primary={fCurrency(row.amount)} secondary={row.comment}/>
                  </Box>
                </TableCell>
                <TableCell>{row.type}</TableCell>
              </TableRow>
            ))}
          </Table>
        </CardContent>
      </Card>
      <AddDepotModal open={add.value} onClose={add.onFalse} />
    </>
  );
}
