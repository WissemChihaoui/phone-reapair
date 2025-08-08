import React from 'react';

import {
  Box,
  Card,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Upload } from 'src/components/upload';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function ProductImportView() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission logic here
    console.log('Form submitted');
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Importer une facture"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Importer une facture' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
          px: 3,
          py: 5,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="fournisseur-select">Fournisseur</InputLabel>
            <Select
              id="fournisseur-select"
              defaultValue=""
              label="Fournisseur"
              input={<OutlinedInput label="Fournisseur" />}
            >
              <MenuItem value="" disabled>
                Choisir fournisseur
              </MenuItem>
              <MenuItem value="f1">Fournisseur 1</MenuItem>
              <MenuItem value="f2">Fournisseur 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel shrink>Facture</InputLabel>
            <Upload />
          </FormControl>

          <Button variant="contained" type="submit" size="large">
            Importer
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
