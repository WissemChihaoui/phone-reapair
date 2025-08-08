import React from 'react';

import { Alert, Tab, Tabs } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import DevisCard from 'src/components/dashboard/devis-card/DevisCard';
import VentesCard from 'src/components/dashboard/ventes-card/VentesCard';
import AchatsCard from 'src/components/dashboard/achats-card/AchatsCard';
import SearchVente from 'src/components/dashboard/search-vente/SearchVente';
import { CaisseCard } from 'src/components/dashboard/caisse-card/CaisseCard';
import { StockWidget } from 'src/components/dashboard/stock-widget/StockWidget';
import ReparationCard from 'src/components/dashboard/reparation-card/ReparationCard';
import SearchReparation from 'src/components/dashboard/search-reparation/SearchReparation';
import { ReparationsTable } from 'src/components/dashboard/reparations-table/ReparationsTable';
import { useTabs } from 'src/hooks/use-tabs';
import { varAlpha } from 'src/theme/styles';
import { CustomTabs } from 'src/components/custom-tabs';

export default function DashboardView() {
  
  const reparationsData = [
  {
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    actions: 'View', // placeholder for actions column
    technicien: 'Marie Martin',
    reparation: 'IR_PC000245',
    piece: 'Ecran iPhone 7',
    ref: 'PC-245',
    client: 'Hlel Khalifa',
    produit: 'Macbook',
    status: 'En attente devis',
    price: 12
  },
];

const tabs = useTabs('reparation')

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            Date expiration abonnement : <strong>31-12-2025</strong> | Solde SMS restants :{' '}
            <strong>0 SMS</strong>
          </Alert>
        </Grid>
        <Grid xs={12}>
          <CustomTabs
            value={tabs.value}
            onChange={tabs.onChange}
            variant="fullWidth"
            sx={{
              px: 3,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {[
              { value: 'reparation', label: 'Réparations' },
              { value: 'ventes', label: 'Ventes' },
            ].map((tab) => (
              <Tab
               key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </CustomTabs>
          {tabs.value === 'reparation' && (
            <SearchReparation />
          )}
          {tabs.value === 'ventes' && (
            <SearchVente />
          )}
        </Grid>
      
      
        <Grid xs={12} md={6} container>
          <Grid xs={12} md={6}>
            <ReparationCard
              icon={
                <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
              }
              title="Réparations"
              percent={2.6}
              total={18}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <VentesCard
              icon={
                <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />
              }
              title="Ventes"
              percent={-50}
              total={1}
              color="warning"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <DevisCard
              icon={
                <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`} />
              }
              title="Devis"
              percent={10}
              total={17}
              color="secondary"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <AchatsCard
              icon={<img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/wallet.svg`} />}
              title="Achats"
              percent={0}
              total={2}
              color="info"
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={6} container>
          <Grid xs={12}>
            <CaisseCard
              title="Caisse"
              earning={25500}
              orderTotal={287650}
              currentBalance={187650}
            />
          </Grid>
          <Grid xs={12} container>
            <Grid xs={12} md={6}>
              <StockWidget
                title="Stock Faible"
                total={6}
                icon={`${CONFIG.assetsDir}/assets/icons/mise-en-garde.png`}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <StockWidget
                title="Stock Epuisé"
                total={4}
                icon={`${CONFIG.assetsDir}/assets/icons/attention.png`}
                color="error"
              />
            </Grid>
          </Grid>
        </Grid>
       
        <Grid xs={12}>
          <ReparationsTable
            title="Liste des interventions"
            tableData={reparationsData}
            headLabel={[
              { id: 'actions', label: 'Actions' },
              { id: 'technicien', label: 'Technicien' },
              { id: 'reparation', label: 'Réparation' },
              { id: 'piece', label: 'Piéce à changer' },
              { id: 'ref', label: 'Réf' },
              { id: 'client', label: 'Client' },
              { id: 'produit', label: 'Produit' },
              { id: 'status', label: 'Status' },
              { id: 'price', label: 'Prix' },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
