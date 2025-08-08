import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Stack, Button, Dialog, DialogActions } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CaisseToolbar from '../caisse-toolbar';
import FondTableView from '../fond-table-view';
import DepotTableView from '../depot-table-view';
import ClotureCaissePDF from '../ClotureCaissePDF';
import { CaisseWidgetSummary } from '../caisse-widget-summary';
import CaisseVerificationTable from '../caisse-verification-table';

export default function CaissePageView() {
  const tabs = useTabs('fond');
  const open = useBoolean();

  return (
    <>
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Caisse"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Caisse', href: paths.dashboard.caisse.root },
          { name: 'Page' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Stack display="flex" flexDirection="row" gap={2}>
            <DatePicker name="date" />
            <Button variant="contained" color="primary">
              Voir la caisse
            </Button>
            <Button onClick={open.onTrue} variant="contained" color="success">
              Z de Caisse
            </Button>
          </Stack>
        }
      />
      <Grid container spacing={2}>
        <Grid xs={12} md={3}>
          <CaisseWidgetSummary
            title="Montant en ESPECE"
            percent={2.6}
            total={765}
            chart={{
              categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <CaisseWidgetSummary
            title="Montant en CHEQUE"
            percent={-2.6}
            total={102}
            chart={{
              categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <CaisseWidgetSummary
            title="Montant en CARTE BANCAIRE"
            percent={-2.6}
            total={660}
            chart={{
              categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <CaisseWidgetSummary
            title="Montant en VIREMENT"
            percent={8}
            total={7555}
            chart={{
              categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12}>
          <CaisseToolbar tabs={tabs} />
        </Grid>
        <Grid xs={12}>
          {tabs.value === 'fond' && <FondTableView />}
          {tabs.value === 'retrait' && <DepotTableView />}
          {tabs.value === 'verification' && <CaisseVerificationTable />}
        </Grid>
      </Grid>
    </DashboardContent>
    <Dialog fullScreen open={open.value} onClose={open.onFalse}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={open.onFalse}>
              Fermer
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <ClotureCaissePDF date="08-08-2025"/>
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
      </>
  );
}
