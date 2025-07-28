import React from 'react';

import {
  Fab,
  Link,
  Stack,
  Button,
  Tooltip,
  TableRow,
  TableCell,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { AddServiceDialog } from 'src/components/form-dialogs/service';

export default function ServiceTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const quickEdit = useBoolean();

  return (
    <>
      <TableRow hover>
         <TableCell>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab color='warning' size='small' onClick={quickEdit.onTrue}>
                <Iconify icon="solar:pen-bold" />
              </Fab>
            </Tooltip>
            <Tooltip title="Supprimer" placement="top" arrow>
              <Fab color='error' size='small' onClick={confirm.onTrue}>
                <Iconify icon="tabler:trash" />
              </Fab>
            </Tooltip>
          </Stack>
        </TableCell>
       

        <TableCell>
          <Stack spacing={1}>
            <Link color="inherit" onClick={onEditRow} style={{ cursor: 'pointer' }}>
              {row.name}
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{row.ref}</TableCell>
        <TableCell>{row.ean}</TableCell>
        <TableCell>{fCurrency(row.pricettc)}</TableCell>
        <TableCell>{fCurrency(row.priceht)}</TableCell>
        <TableCell>{row.tva}</TableCell>

       
      </TableRow>

     <AddServiceDialog open={quickEdit.value} onClose={quickEdit.onFalse} currentRow={row}/>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir supprimer cet élément ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
