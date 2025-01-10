import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

export default function ImpressionPageView() {
  // State for the form
  const [formState, setFormState] = useState({
    isThermalPrinterEnabled: false,
    isCashDrawerEnabled: false,
    thermalPrinterName: '',
    receiptHeader: '',
    receiptFooter: '',
  });

  // Handle state changes
  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Impressions"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Impressions', href: paths.dashboard.boutique.impression },
            { name: 'Page' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <CardHeader sx={{ mb: 2 }} title="Impression" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Disponibilté d&apos;imprémante</Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        name="isThermalPrinterEnabled"
                        checked={formState.isThermalPrinterEnabled}
                        onChange={handleSwitchChange}
                      />
                    }
                    label="Imprimante thérmique :"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        name="isCashDrawerEnabled"
                        checked={formState.isCashDrawerEnabled}
                        onChange={handleSwitchChange}
                      />
                    }
                    label="Tiroir caisse :"
                  />
                </Stack>
              </Stack>
              <Stack spacing={1.5} width="100%">
                <TextField
                  label="Nom de l'imprimante thérmique :"
                  size="small"
                  fullWidth
                  name="thermalPrinterName"
                  value={formState.thermalPrinterName}
                  onChange={handleInputChange}
                  disabled={!formState.isThermalPrinterEnabled}
                />
              </Stack>
              <Grid spacing={1.5} container>
                <Grid xs={12} md={6}>
                  <TextField
                    rows={5}
                    multiline
                    label="Ticket de caisse - En-tête:"
                    size="small"
                    fullWidth
                    name="receiptHeader"
                    value={formState.receiptHeader}
                    onChange={handleInputChange}
                    disabled={!formState.isThermalPrinterEnabled}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    rows={5}
                    multiline
                    label="Ticket de caisse - Pied de page:"
                    size="small"
                    fullWidth
                    name="receiptFooter"
                    value={formState.receiptFooter}
                    onChange={handleInputChange}
                    disabled={!formState.isThermalPrinterEnabled}
                  />
                </Grid>
              </Grid>
            </Stack>
            <CardActions
              sx={{
                justifyContent: 'flex-end',
                display: 'flex',
                p: 2,
              }}
            >
              <Button variant="contained">Enregistrer</Button>
            </CardActions>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  );
}
