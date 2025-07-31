import React from 'react';

import { Link, Button, TableRow, TableCell, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function SuivreAbonRow({ row, onDeleteRow }) {
  const confirm = useBoolean();
  return (
    <>
      <TableRow hover>
        <TableCell>
          <Link
            typography="subtitle1"
            color="inherit"
            href={paths.dashboard.vente.suivreDetails(row.id)}
            LinkComponent={RouterLink}
          >
            {row.numero}
          </Link>
        </TableCell>
        <TableCell>{fCurrency(row.amount)}</TableCell>
        <TableCell>
          <Link href={paths.dashboard.client.root}>{row.client.name}</Link>
        </TableCell>
        <TableCell>{fDate(row.nextInvoice)}</TableCell>
        <TableCell>{row.periode}</TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton href={paths.dashboard.vente.suivreDetails(row.id)} LinkComponent={RouterLink}>
            <Iconify icon="tabler:eye" />
          </IconButton>
          <IconButton color="error" onClick={confirm.onTrue}>
            <Iconify icon="tabler:trash" />
          </IconButton>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir supprimer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
