import { Button, Checkbox, Fab, Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import StatusAddEditForm from './status-add-edit-form';

export default function StatusTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
    const popover = usePopover();
    const confirm = useBoolean();
    const quickEdit = useBoolean();
  
    return (
    <>
    <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
            <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab size="small" color="warning" onClick={() => quickEdit.onTrue()}>
                <Iconify icon="solar:pen-bold" />
              </Fab>
            </Tooltip>
            <Tooltip title="Supprimer" placement="top" arrow>
              <Fab
                color="error"
                size="small"
                onClick={() => {
                    confirm.onTrue();
                    popover.onClose();
                  }}
              >
                <Iconify icon="solar:trash-bin-trash-bold" />
              </Fab>
            </Tooltip>
          </Stack>
        </TableCell>
        <TableCell>
            <Typography variant='body2'>
                {row.name}
            </Typography>
        </TableCell>
        <TableCell>
            {row.isSms ? <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'primary.main' }} /> : '-'}
        </TableCell>
        <TableCell>
        {row.isMail ? <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'primary.main' }} /> : '-'}
        </TableCell>
        <TableCell>
        {row.validation ? <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'primary.main' }} /> : '-'}
        </TableCell>
        <TableCell>
        {row.file ? <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'primary.main' }} /> : '-'}
        </TableCell>
        <TableCell>
            <Label style={{ backgroundColor: row.color, color: 'white'}}>{row.color}</Label>
        </TableCell>
    </TableRow>
    <StatusAddEditForm open={quickEdit.value} onClose={quickEdit.onFalse} currentStatus={row} />

    <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Suppression"
        content={`Êtes-vous sûr de vouloir supprimer ${row.name}?`}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  )
}
