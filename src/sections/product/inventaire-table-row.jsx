import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import {
  Box,
  Button,
  Dialog,
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
  DialogActions,
  Fab,
  Stack,
  Tooltip,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { InventairePDF } from './inventaire-pdf';

export default function InventaireTableRow({ row, selected, onSelectRow, onValidateRow }) {
  const valider = useBoolean();
  const view = useBoolean();
  return (
    <>
      <TableRow>
        <TableCell hover selected={selected}>
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </TableCell>
        <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Stack display="flex" gap={1} flexDirection="row" flexWrap="wrap">
            {!row.confirmed && (
              <Tooltip title="Modifier">
                <Fab
                  size="small"
                  color="warning"
                  href={paths.dashboard.stock.editInventaire(row.inventaireId)}
                  LinkComponent={RouterLink}
                >
                  <Iconify icon="lucide:edit" />
                </Fab>
              </Tooltip>
            )}
            <Tooltip title="Exporter">
              <Fab size="small" color="info" onClick={view.onTrue}>
                <Iconify icon="mdi:file-outline" />
              </Fab>
            </Tooltip>
            {!row.confirmed && (
              <Tooltip title="Valider">
                <Fab size="small" onClick={valider.onTrue} color="success">
                  <Iconify icon="mingcute:check-fill" />
                </Fab>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
        <TableCell>
          <Box component="span">#{row.inventaireId}</Box>
        </TableCell>
        <TableCell>
          <Box component="span" sx={{ typography: 'body2' }}>
            {row.createdBy}
          </Box>
        </TableCell>
        <TableCell>
          <Box component="span" sx={{ typography: 'body2' }}>
            {row.note}
          </Box>
        </TableCell>
        <TableCell>
          <Box component="span" sx={{ typography: 'body2' }}>
            {fDate(row.createdAt)}
          </Box>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={valider.value}
        onClose={valider.onFalse}
        title="Valider"
        content="Souhaitez-vous valider votre inventaire"
        action={
          <Button
            onClick={() => {
              onValidateRow?.();
              valider.onFalse();
            }}
            variant="contained"
            color="success"
          >
            Valider
          </Button>
        }
      />

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Fermer
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              {row && <InventairePDF invoice={row} currentStatus="" />}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
