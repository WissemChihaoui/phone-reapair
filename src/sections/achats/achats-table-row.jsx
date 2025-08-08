import React from 'react';

import {
  Box,
  Stack,
  Button,
  Tooltip,
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function AchatsTableRow({ row, selected, onSelectRow, onViewRow, onDeleteRow }) {
  const confirm = useBoolean();
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </TableCell>
        <TableCell>
          <Box
            component="span"
            sx={{
              bgcolor: 'primary.main',
              color: 'common.white',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-block',
            }}
          >
            {row.organisme}
          </Box>
        </TableCell>

        <TableCell>{fCurrency(row.ht)}</TableCell>
        <TableCell>{fCurrency(row.ttc)}</TableCell>
        <TableCell>{row.facture}</TableCell>
        <TableCell>{fDate(row.date)}</TableCell>

        <TableCell>
          {row.fix && (
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                backgroundColor: 'error.main',
                color: 'common.white',
                fontWeight: 700,
                fontSize: 12,
                display: 'inline-block',
              }}
            >
              FIX
            </Box>
          )}
        </TableCell>

        <TableCell>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Modifier">
              <IconButton color="primary" onClick={onViewRow}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Supprimer">
              <IconButton color="error" onClick={() => confirm.onTrue()}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
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
