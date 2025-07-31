import React from 'react';

import { Stack, Button, TableRow, TableCell, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function VenteDevisRow({ row, onDeleteRow }) {
  const router = useRouter();
  const confirm = useBoolean()
  return (
    <>
    <TableRow
      key={row.id}
      hover
    //   onClick={() => router.push(`${paths.dashboard.vente.root}/${row.id}`)}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton href={paths.dashboard.vente.edit(row.id)} LinkComponent={RouterLink}>
            <Iconify icon="bx:edit" />
          </IconButton>
          <IconButton onClick={confirm.onTrue}>
            <Iconify icon="line-md:trash" />
          </IconButton>
        </Stack>
      </TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.ref}</TableCell>
      <TableCell>{row.client}</TableCell>
      <TableCell>{fDate(row.date)}</TableCell>
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
