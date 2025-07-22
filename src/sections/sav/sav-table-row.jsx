import React, { useRef, useState, useCallback } from 'react';

import { Fab, Stack, Tooltip, TableRow, TableCell, Box, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

export default function SavTableRow({ row, selected, STATUS_OPTIONS }) {
  const router = useRouter();

  const hoverPopoverRef = useRef(null);

  const [hoverPopoverOpen, setHoverPopoverOpen] = useState(false);

  const handleHoverPopoverOpen = useCallback(() => {
    setHoverPopoverOpen(true);
  }, []);

  const handleHoverPopoverClose = useCallback(() => {
    setHoverPopoverOpen(false);
  }, []);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
            
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab
                size="small"
                color="warning"
                onClick={() => router.push(paths.dashboard.sav.edit(row.id))}
              >
                <Iconify icon="solar:pen-bold" />
              </Fab>
            </Tooltip>
            <Fab
              onMouseEnter={handleHoverPopoverOpen}
              onMouseLeave={handleHoverPopoverClose}
              ref={hoverPopoverRef}
              size="small"
              color="info"
            >
              <Iconify icon="akar-icons:info" />
            </Fab>
          </Stack>
        </TableCell>
        <TableCell align="left">{row.sav}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'en_cours' && 'info') ||
              (row.status === 'en_attente' && 'warning') ||
              (row.status === 'defectueux' && 'error') ||
              'default'
            }
          >
            {STATUS_OPTIONS.find((option) => option.value === row.status)?.label}
          </Label>
        </TableCell>
        <TableCell align="left">{row.client}</TableCell>
        <TableCell align="left">{row.product}</TableCell>
        <TableCell align="left">{row.type}</TableCell>
        <TableCell align="left">{row.fournisseur}</TableCell>
        <TableCell align="left">{fDate(row.date)}</TableCell>
        <TableCell align="left">{row.recu}</TableCell>
      </TableRow>
      <CustomPopover
        open={hoverPopoverOpen}
        anchorEl={hoverPopoverRef.current}
        slotProps={{
          arrow: { placement: 'bottom-center' },
          paper: {
            onMouseEnter: handleHoverPopoverOpen,
            onMouseLeave: handleHoverPopoverClose,
            sx: { ...(hoverPopoverOpen && { pointerEvents: 'auto' }) },
          },
        }}
        sx={{ pointerEvents: 'none' }}
      >
        <Box sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Note
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {row.note || 'Aucune note disponible.'}
          </Typography>
        </Box>
      </CustomPopover>
    </>
  );
}
