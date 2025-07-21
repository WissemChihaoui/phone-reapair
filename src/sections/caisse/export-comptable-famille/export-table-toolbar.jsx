import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback } from 'react';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { Dialog, DialogActions } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { ExportFamillePDF } from './export-famille-pdf';

// ----------------------------------------------------------------------
const invoice = {
  period: {
    start: '2025-07-01',
    end: '2025-07-21',
  },
  invoiceFrom: {
    name: 'demo reparateur',
    fullAddress: 'Rue Général Delacroix - Bazin\n97139 Les Abymes',
    phoneNumber: '0690751575',
  },
  grouped: {
    v001: [
      {
        numero: 'F2025-0594',
        reference: 'V07-25-1312',
        articles: 'article related',
        ht: 83.33,
        taux: '20%',
        tva: 16.67,
        ttc: 100.0,
        date: '2025-07-09T13:54:00',
      },
      {
        numero: 'F2025-0593',
        reference: 'V07-25-1311',
        articles: 'fournisseur test new article',
        ht: 60,
        taux: '20%',
        tva: 12,
        ttc: 72,
        date: '2025-07-07T15:11:00',
      },
      {
        numero: 'F2025-0592',
        reference: 'V07-25-1310',
        articles: 'fournisseur test new article',
        ht: 30,
        taux: '20%',
        tva: 6,
        ttc: 36,
        date: '2025-07-07T15:06:00',
      },
    ],
    v002: [],
  },
};

export function ExportTableToolbar({ filters, onResetPage, dateError, sx }) {
  const view = useBoolean();
  // Example family options, replace with your actual list
  const familyOptions = [
    { value: '', label: 'Toutes les familles' },
    { value: 'Famille A', label: 'Famille A' },
    { value: 'Famille B', label: 'Famille B' },
  ];

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [onResetPage, filters]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [onResetPage, filters]
  );

  // Dummy export handler

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 }, ...sx }}
      >
        <Stack direction="row" spacing={2} alignItems="center" flex={1}>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="famille-label">Famille</InputLabel>
            <Select
              labelId="famille-label"
              value={filters.state.type || ''}
              label="Famille"
              onChange={(e) => {
                filters.setState({ type: e.target.value });
                onResetPage?.();
              }}
            >
              {familyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Date début"
            value={filters.state.startDate}
            onChange={handleFilterStartDate}
            slotProps={{ textField: { error: !!dateError } }}
          />

          <DatePicker
            label="Date fin"
            value={filters.state.endDate}
            onChange={handleFilterEndDate}
            slotProps={{ textField: { error: !!dateError } }}
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={view.onTrue}
          startIcon={<Iconify icon="humbleicons:download" />}
        >
          Exporter PDF
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
              {invoice && <ExportFamillePDF invoice={invoice} />}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
