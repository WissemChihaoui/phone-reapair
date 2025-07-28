import React from 'react';

import {
  Box,
  Fab,
  Link,
  Stack,
  Button,
  Tooltip,
  Checkbox,
  TableRow,
  TableCell
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import AddAbonnementDialog from 'src/components/form-dialogs/abonnements';

export default function AbonnementTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, SwitchStatus }) {
  const confirm = useBoolean();

  const quickEdit = useBoolean();
  return (
    <>
    <TableRow hover  tabIndex={-1}>
      
       <TableCell>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Modifier" placement="top" arrow>
            <Fab size='small' color='warning' onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </Fab>
          </Tooltip>
          <Tooltip title="Supprimer" placement="top" arrow>
            <Fab size='small' color='error' onClick={confirm.onTrue}>
              <Iconify icon="tabler:trash" />
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
              {row.description}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.duration}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(row.price)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.frequence}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.conditions}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.actif ? <Button variant='contained' size='small' color='success' onClick={SwitchStatus}>Actif</Button> : <Button variant='contained' size='small' color='error' onClick={SwitchStatus}>Inactif</Button>}</TableCell>
     
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

      <AddAbonnementDialog open={quickEdit.value} onClose={quickEdit.onFalse} currentRow={row} />
      </>
  );
}
