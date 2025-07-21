import React, { forwardRef } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import {
  Box,
  Fab,
  Link,
  Slide,
  Stack,
  Button,
  Dialog,
  Tooltip,
  TableRow,
  TableCell,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import RachatSinglePDF from './rachat-single-pdf';

const STATUS_OPTIONS = {
  excellent: { label: 'Excellent' },
  bien: { label: 'Bien' },
  moyen: { label: 'Moyen' },
  mauvais: { label: 'Mauvais' },
};
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export function RachatTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const router = useRouter();
  const showCin = useBoolean();
  const showFacture = useBoolean();

  const invoice = {
    ...row,
    invoiceNumber: `RACHAT-${row.id}`,
  };
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab
                size="small"
                color="warning"
                onClick={() => router.push(paths.dashboard.rachat.edit(row.id))}
              >
                <Iconify icon="solar:pen-bold" />
              </Fab>
            </Tooltip>
          </Stack>
        </TableCell>

        <TableCell>
          <Link color="inherit" onClick={onViewRow} underline="none" sx={{ cursor: 'pointer' }}>
            #{row.id}
          </Link>
        </TableCell>

        <TableCell>
          <Image alt={row.id} src={row.cab} ratio="21/9" sx={{ width: 120 }} />
        </TableCell>

        <TableCell>
          <Link
            variant="subtitle1"
            color="inherit"
            onClick={onViewRow}
            underline="none"
            sx={{ cursor: 'pointer' }}
          >
            {row.name}
          </Link>
        </TableCell>

        <TableCell>
          <Button variant="text">{row.client}</Button>
        </TableCell>

        <TableCell>{fDate(row.date)}</TableCell>

        <TableCell>
          <Fab size="small" color="primary" variant="outlined" onClick={() => showCin.onTrue()}>
            <Iconify icon="mdi:eye" />
          </Fab>
        </TableCell>

        <TableCell>
          <Fab size="small" color="primary" variant="outlined" onClick={() => showFacture.onTrue()}>
            <Iconify icon="mdi:eye" />
          </Fab>
        </TableCell>

        <TableCell>{fCurrency(row.price)}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'excellent' && 'success') ||
              (row.status === 'bien' && 'info') ||
              (row.status === 'moyen' && 'warning') ||
              (row.status === 'mauvais' && 'error') ||
              'default'
            }
          >
            {STATUS_OPTIONS[row.status]?.label || 'Unknown'}
          </Label>
        </TableCell>

        <TableCell>
          <Button
            sx={{ px: 1 }}
            size="small"
            color="success"
            variant="outlined"
            startIcon={<Iconify icon="foundation:page-export-pdf" />}
          >
            Imprimer
          </Button>
        </TableCell>
      </TableRow>
      <Dialog
        keepMounted
        open={showCin.value}
        TransitionComponent={Transition}
        onClose={showCin.onFalse}
      >
        <DialogContent>
          <Box p={2}>
            <Image src={row.cin} alt={row.cin} />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        fullScreen
        keepMounted
        open={showFacture.value}
        TransitionComponent={Transition}
        onClose={showFacture.onFalse}
      >
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={showFacture.onFalse}>
              Fermer
            </Button>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              {invoice && <RachatSinglePDF rachat={invoice} />}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
