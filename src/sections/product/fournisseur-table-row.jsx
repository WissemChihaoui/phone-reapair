import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { Fab } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover } from 'src/components/custom-popover';
import { useCallback, useState } from 'react';
import FournisseurAddEditForm from './FournisseurAddEditForm';

// import { UserQuickEditForm } from './user-quick-edit-form';

// ----------------------------------------------------------------------

export function FournisseurTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  const quickEdit = useBoolean();


  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              
            </Stack>
          </Stack>
        </TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phone}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {row.email}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
         {row.city}, {row.state}, {row.zipCode}
        </TableCell>
          
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab
                size='small'
                color='warning'
                onClick={()=>quickEdit.onTrue()}
              >
                <Iconify icon="solar:pen-bold" />
              </Fab>
            </Tooltip>
            <Tooltip title="Supprimer" placement='top' arrow>
              <Fab color='error' size='small' onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </Fab>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}
      <FournisseurAddEditForm currentFournisseur={row} open={quickEdit.value } onClose={quickEdit.onFalse}/>

      
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir effacer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
