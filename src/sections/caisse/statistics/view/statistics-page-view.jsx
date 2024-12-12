import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { GraphicCaisse } from '../graphic-caisse';

export default function StatisticsPageView() {
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Statistiques"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Statistiques', href: paths.dashboard.caisse.statistiques },
            { name: 'Page' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Grid container spacing={3}>
          <Grid xs={12}>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
              <GraphicCaisse
                title="Graph CA"
                subheader="Graphe de chiffre d'affaire"
                chart={{
                    categories: {
                      Quotidiennement: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi'],
                      Hebdomadaire: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                      Mensuel: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Août', 'Sep'],
                      Annuel: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    },
                    series: [
                      { name: 'Quotidiennement', data: [8, 10, 20, 14] },
                      { name: 'Hebdomadaire', data: [24, 41, 35, 151, 49] },
                      { name: 'Mensuel', data: [83, 112, 119, 88, 103, 112, 114, 108, 93] },
                      { name: 'Annuel', data: [76, 42, 29, 41, 27, 96] },
                    ],
                  }}
                  
              />
            </Box>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}
