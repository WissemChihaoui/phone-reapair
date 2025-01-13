import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from 'src/routes/paths';
import { useTabs } from 'src/hooks/use-tabs';
import CaisseToolbar from '../caisse-toolbar';
import { CaisseWidgetSummary } from '../caisse-widget-summary';
import FondTableView from '../fond-table-view';
import DepotTableView from '../depot-table-view';
import CaisseVerificationTable from '../caisse-verification-table';



export default function CaissePageView() {

  const tabs = useTabs("fond")

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
        />
        <Grid container spacing={2}>
          
          <Grid xs={12} md={3}>
            <CaisseWidgetSummary 
              title="Fond de caisse attendu ESPECE"
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
              title="Fond de caisse attendu CHEQUE"
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
              title="Fond de caisse attendu CARTE BANCAIRE"
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
              title="Fond de caisse attendu VIREMENT"
              percent={8}
              total={7555}
              chart={{
                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août'],
                series: [22, 8, 35, 50, 82, 84, 77, 12],
              }}
            />
          </Grid>
          <Grid xs={12}>
            <CaisseToolbar tabs={tabs}/>
          </Grid>
          <Grid xs={12}>
            {tabs.value === "fond" &&<FondTableView />}
            {tabs.value === "retrait" && <DepotTableView />}
            {tabs.value === "verification" && <CaisseVerificationTable />}
          </Grid>
        </Grid>

      </DashboardContent>
    </>
  );
}
