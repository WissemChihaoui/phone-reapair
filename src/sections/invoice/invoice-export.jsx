import React, { useState } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import {
  Box,
  Card,
  Select,
  Button,
  MenuItem,
  TextField,
  CardHeader,
  InputLabel,
  FormControl,
} from '@mui/material';

export default function InvoiceExport() {
  // State for form fields
  const [exportType, setExportType] = useState('Facture');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [invoiceType, setInvoiceType] = useState('Facture');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with your export logic
    const formData = {
      exportType,
      startDate,
      endDate,
      invoiceType,
    };
    console.log('Exporting with:', formData);
    // TODO: Add your export logic here
  };

  return (
    <Card sx={{ mb: { xs: 3, md: 5 } }}>
      <CardHeader title="Fusion des factures" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2 }}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="export-type-label">Type d&apos;export</InputLabel>
          <Select
            labelId="export-type-label"
            value={exportType}
            label="Type d'export"
            fullWidth
            onChange={(e) => setExportType(e.target.value)}
          >
            <MenuItem value="Facture">Facture</MenuItem>
            <MenuItem value="Accomptes">Accomptes</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label="Date de début"
          value={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Date de fin"
          value={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormControl sx={{ flexGrow: 1, minWidth: 200 }}>
          <InputLabel id="invoice-type-label">Type de facture</InputLabel>
          <Select
            labelId="invoice-type-label"
            value={invoiceType}
            label="Type de facture"
            fullWidth
            onChange={(e) => setInvoiceType(e.target.value)}
          >
            <MenuItem value="Facture">Tous</MenuItem>
            <MenuItem value="Réparations">Réparations</MenuItem>
            <MenuItem value="Ventes">Ventes</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Fusionner les factures
        </Button>
      </Box>
    </Card>
  );
}
