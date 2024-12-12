import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { CONFIG } from 'src/config-global';
import { paths } from 'src/routes/paths';
import { GraphicCaisse } from '../graphic-caisse';
import { StatisticsWidgetSummary } from '../statistics-widget-sumary';
import DataCardStatistics from '../data-card-statistics';
import PecDataCard from '../pec-data-card';

// Helper function to calculate total and percent growth
const calculateTotalAndGrowth = (data) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  const growth = data.length > 1 ? ((data[data.length - 1] - data[data.length - 2]) / data[data.length - 2]) * 100 : 0;
  return { total, growth: parseFloat(growth.toFixed(2)) };
};

export default function StatisticsPageView() {
  // Data for each level of CA (Annuel, Mensuel, Quotidiennement)
  const yearlyData = [76, 42, 29, 41, 27, 96, 200]; // Example yearly data
  const monthlyData = [12, 18, 25, 32, 40, 55, 62, 76, 85, 90, 95, 70]; // Monthly breakdown
  const dailyData = [8, 10, 20, 14, 18, 22, 25]; // Daily CA

  // Calculate totals and growth percentages dynamically
  const annualStats = calculateTotalAndGrowth(yearlyData);
  const monthlyStats = calculateTotalAndGrowth(monthlyData);
  const dailyStats = calculateTotalAndGrowth(dailyData);

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
            <Grid xs={12} md={4}>
              <PecDataCard 
                  icon={
                    <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                  }
                  title="NB PEC"
                  percent={2.6}
                  total={18}
                  color='success'
              />
            </Grid>
         
            <Grid xs={12} md={4}>
              <DataCardStatistics
                  icon={
                      <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />
                    }
                    title="NB Vente"
                    percent={2.6}
                    total={18}
                    color='warning'
              />
            </Grid>
            
            <Grid xs={12} md={4}>
              <DataCardStatistics
                  icon={
                      <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />
                    }
                    title="Nouveau utilisateur"
                    percent={2.6}
                    total={18}
                    color='secondary'
              />
            </Grid>
          


          {/* Annual CA */}
          <Grid xs={12} md={4}>
            <StatisticsWidgetSummary
              title="CA. Annuel"
              percent={annualStats.growth}
              comparedTo="Dernière année"
              total={annualStats.total}
              chart={{
                categories: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                series: yearlyData,
              }}
            />
          </Grid>

          {/* Monthly CA */}
          <Grid xs={12} md={4}>
            <StatisticsWidgetSummary
              title="CA. Mensuel"
              percent={monthlyStats.growth}
              comparedTo="Dernier mois"
              total={monthlyStats.total}
              chart={{
                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
                series: monthlyData,
              }}
            />
          </Grid>

          {/* Daily CA */}
          <Grid xs={12} md={4}>
            <StatisticsWidgetSummary
              title="CA. Quotidiennement"
              percent={dailyStats.growth}
              comparedTo="Hier"
              total={dailyStats.total}
              chart={{
                categories: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                series: dailyData,
              }}
            />
          </Grid>

          {/* Overall Chart */}
          <Grid xs={12}>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
              <GraphicCaisse
                title="Graphique CA"
                subheader="Évolution des chiffres d'affaire"
                chart={{
                  categories: {
                    Quotidiennement: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                    Mensuel: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
                    Annuel: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                  },
                  series: [
                    { name: 'Quotidiennement', data: dailyData },
                    { name: 'Mensuel', data: monthlyData },
                    { name: 'Annuel', data: yearlyData },
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
