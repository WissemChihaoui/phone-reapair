import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  MenuItem,
  MenuList,
  Button,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function ServiceTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
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
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.actif}</TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
      </>
  );
}
