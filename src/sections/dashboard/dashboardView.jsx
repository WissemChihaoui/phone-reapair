import React, { useRef } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Alert, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import DevisCard from 'src/components/dashboard/devis-card/DevisCard';
import VentesCard from 'src/components/dashboard/ventes-card/VentesCard';
import AchatsCard from 'src/components/dashboard/achats-card/AchatsCard';
import { CaisseCard } from 'src/components/dashboard/caisse-card/CaisseCard';
import { StockWidget } from 'src/components/dashboard/stock-widget/StockWidget';
import ReparationCard from 'src/components/dashboard/reparation-card/ReparationCard';
import SearchReparation from 'src/components/dashboard/search-reparation/SearchReparation';
import { ReparationsTable } from 'src/components/dashboard/reparations-table/ReparationsTable';
import SearchVente from 'src/components/dashboard/search-vente/SearchVente';

export default function DashboardView() {
  const transactionsData = [
    {
      id: 1,
      date: '01/11/2024',
      client: 'Jane Doe',
      amount: 111000,
      methode: 'CB',
      employee: 'Wissem',
    },
    {
      id: 2,
      date: '02/11/2024',
      client: 'John Smith',
      amount: 75000,
      methode: 'Virement Bancaire',
      employee: 'Ahmed',
    },
    {
      id: 3,
      date: '03/11/2024',
      client: 'Emily Clark',
      amount: 50000,
      methode: 'Espèces',
      employee: 'Sara',
    },
    {
      id: 4,
      date: '04/11/2024',
      client: 'Michael Brown',
      amount: 120000,
      methode: 'Carte de Crédit',
      employee: 'Noah',
    },
    {
      id: 5,
      date: '05/11/2024',
      client: 'Linda Green',
      amount: 92000,
      methode: 'CB',
      employee: 'Wissem',
    },
  ];
  const reparationsData = [
  {
    id: 1,
    actions: 'View', // placeholder for actions column
    technicien: 'Marie Martin',
    reparation: 'IR_PC000245',
    piece: 'Ecran iPhone 7',
    ref: 'PC-245',
    client: 'Hlel Khalifa',
    produit: 'Macbook',
    status: 'En attente devis',
  },
];

  const hoverPopoverRef = useRef(null);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            Date expiration abonnement : <strong>31-12-2025</strong> | Solde SMS restants :{' '}
            <strong>0 SMS</strong>
          </Alert>
        </Grid>
        <Grid xs={12} md={6} container>
          <Grid xs={12}>
            <SearchReparation />
          </Grid>
        </Grid>
        <Grid xs={12} md={6}>
          <SearchVente />
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
        {/* <Grid xs={12} md={8}>
          <StockChart
            title="Stock"
            chart={{
              series: [
                { label: 'En Stock', value: 45 },
                { label: 'Epuisé', value: 25 },
                { label: 'Faible', value: 20 },
              ],
            }}
          />
        </Grid> */}
        {/* <Grid xs={12} md={2}>
          <Box height="100%">
            <Button
              variant="contained"
              color="primary"
              sx={{ height: '50%', borderRadius: '12px 12px 0 0' }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Iconify width={36} icon="ic:outline-sms" />
                Envoyer SMS
              </Box>
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ height: '50%', borderRadius: '0 0 12px 12px' }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Iconify width={36} icon="ic:outline-mail" />
                Envoyer Email
              </Box>
            </Button>
          </Box>
        </Grid> */}
        {/* <Grid xs={12}>
          <TransactionsTable
            title="Dernières Transactions"
            tableData={transactionsData}
            headLabel={[
              { id: 'client', label: 'Client' },
              { id: 'date', label: 'Date' },
              { id: 'amount', label: 'Monatnt' },
              { id: 'methode', label: 'Méthode' },
              { id: 'employee', label: 'Employée' },
            ]}
          />
        </Grid> */}
        <Grid xs={12}>
          <ReparationsTable
            title="Liste des interventions"
            tableData={reparationsData}
            headLabel={[
              { id: 'actions', label: 'Actions' },
              { id: 'technicien', label: 'Technicien' },
              { id: 'reparation', label: 'Réparation' },
              { id: 'piece', label: 'Piéce' },
              { id: 'ref', label: 'Réf' },
              { id: 'client', label: 'Client' },
              { id: 'produit', label: 'Produit' },
              { id: 'status', label: 'Status' },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
