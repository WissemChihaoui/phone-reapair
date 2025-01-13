import {
    Button,
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
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
  import { fCurrency } from 'src/utils/format-number';
  import { fDate, today } from 'src/utils/format-time';
import CaisseVerificationModal from './caisse-verification-modal';
  
  
  const DATA = [
      {
          id: 266,
          date: today(),
          amount: 500,
          ecart:120,
          raison: 'Dépot'
      }
  ]
  export default function CaisseVerificationTable() {

    const add = useBoolean()
    return (
      <>
        <Card>
          <CardHeader 
            title="Fond de la caisse" 
            action={
                <Button onClick={()=> add.onTrue()} variant="contained" startIcon={<Iconify icon="material-symbols:add-rounded" />}>
                  Vérifier caisse
                </Button>
              }
        />
          <CardContent>
            <Table>
              <TableHead>
                <TableCell>Date</TableCell>
                <TableCell>Espèce attendu</TableCell>
                <TableCell>Ecart</TableCell>
                <TableCell>Raison de l&apos;ecart</TableCell>
              </TableHead>
              <TableBody>
                {DATA.map((row) => (
                  <TableRow key={row.id}>
                  <TableCell>{fDate(row.date)}</TableCell>
                  <TableCell>{fCurrency(row.amount)}</TableCell>
                  <TableCell>{fCurrency(row.amount)}</TableCell>
                  <TableCell>{row.raison}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <CaisseVerificationModal open={add.value} onClose={add.onFalse}/>
      </>
    );
  }
  