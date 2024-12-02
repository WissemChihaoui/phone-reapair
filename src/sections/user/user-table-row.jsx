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

import { UserQuickEditForm } from './user-quick-edit-form';

// ----------------------------------------------------------------------

export function UserTableRow({ row, selected, onEditRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  const quickEdit = useBoolean();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
      <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab
                size='small'
                color='warning'
                onClick={quickEdit.onTrue}
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

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Stack>
        </TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.raison}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Label variant="soft"
              color={
                (row.isInd ? 'warning' : 'success')
              }
              >
                {row.isInd ? 'Individuel' : 'Société'}
              </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
         {row.state}, {row.address}, {row.zipCode}
        </TableCell>
          
        
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      
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
