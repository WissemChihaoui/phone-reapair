import { useCallback } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { Box, Button, Dialog, Checkbox, DialogActions, FormControlLabel } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { AchatsPDF } from './achats-pdf';

// ----------------------------------------------------------------------
const exampleInvoice = {
  period: {
    start: '2023-04-03',
    end: '2025-07-21',
  },
  invoiceFrom: {
    name: 'demo reparateur',
    fullAddress: 'Rue Général Delacroix - Bazin\n97139 Les Abymes',
    phoneNumber: '0690751575',
  },
  items: [
    {
      id: 1,
      organisme: 'STEG',
      numero: 'd5f65f6d',
      priceHT: 12.5,
      totalTTC: 15,
      date: '2025-05-01T02:00:00',
    },
    {
      id: 2,
      organisme: 'STEG',
      numero: 'sdfsdf5',
      priceHT: 65,
      totalTTC: 89,
      date: '2025-04-23T02:00:00',
    },
    {
      id: 3,
      organisme: 'STEG',
      numero: 'F-6955',
      priceHT: 25,
      totalTTC: 30,
      date: '2025-04-10T02:00:00',
    },
  ],
};

export function AchatsTableToolbar({ filters, onResetPage, dateError }) {
  const view = useBoolean();
  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <>
      <Stack
        display="flex"
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
        justifyContent={{ xs: 'flex-start', md: 'space-between' }}
      >
        <Stack
          spacing={2}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
        >
          <DatePicker
            label="Date de début"
            value={filters.state.startDate}
            onChange={handleFilterStartDate}
            slotProps={{ textField: { fullWidth: true } }}
            sx={{ maxWidth: { md: 200 } }}
          />

          <DatePicker
            label="Date de fin"
            value={filters.state.endDate}
            onChange={handleFilterEndDate}
            slotProps={{
              textField: {
                fullWidth: true,
                error: dateError,
                helperText: dateError
                  ? 'La date de fin doit être postérieure à la date de début'
                  : null,
              },
            }}
            sx={{
              maxWidth: { md: 200 },
              [`& .${formHelperTextClasses.root}`]: {
                position: { md: 'absolute' },
                bottom: { md: -40 },
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.state.fix === true}
                onChange={(event) => {
                  onResetPage();
                  filters.setState({ fix: !!event.target.checked });
                }}
              />
            }
            label="Afficher les charges fixes"
            sx={{ width: { xs: 'max-content' } }}
          />

          <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              fullWidth
              value={filters.state.name}
              onChange={handleFilterName}
              placeholder="Rechercher un organisme ou un numéro de facture..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <Button startIcon={<Iconify icon="tabler:pdf" />} variant="contained" onClick={view.onTrue}>
          Exporter
        </Button>
      </Stack>
      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Fermer
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              {exampleInvoice && <AchatsPDF invoice={exampleInvoice} />}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
