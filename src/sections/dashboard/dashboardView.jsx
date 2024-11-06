import { Box, Button, Fab, IconButton, MenuItem, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CONFIG } from 'src/config-global';

import React, { useRef, useState } from 'react';
import ReparationCard from 'src/components/dashboard/reparation-card/ReparationCard';
import SearchReparation from 'src/components/dashboard/search-reparation/SearchReparation';
import SearchVente from 'src/components/dashboard/search-vente/SearchVente';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import VentesCard from 'src/components/dashboard/ventes-card/VentesCard';
import DevisCard from 'src/components/dashboard/devis-card/DevisCard';
import DemandeDevisCard from 'src/components/dashboard/demande-devis-card/DemandeDevisCard';
import { CaisseCard } from 'src/components/dashboard/caisse-card/CaisseCard';
import AchatsCard from 'src/components/dashboard/achats-card/AchatsCard';
import { StockChart } from 'src/components/dashboard/stock-chart/StockChart';
import { TransactionsTable } from 'src/components/dashboard/transactions-table/TransactionsTable';
import { _bankingRecentTransitions } from 'src/_mock';
import { ReparationsTable } from 'src/components/dashboard/reparations-table/ReparationsTable';
import { CustomPopover } from 'src/components/custom-popover';
import { StockWidget } from 'src/components/dashboard/stock-widget/StockWidget';
import { paths } from 'src/routes/paths';

export default function DashboardView() {
  // const periods= ["today", "month"]
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
      date: '01/11/2024',
      modele: 'Macbook',
      status: 'En attente devis',
      reparation: 'IR_PC000245',
    },
    {
      id: 2,
      date: '02/11/2024',
      modele: 'iPhone 12',
      status: 'Attente validation devis',
      reparation: 'IR_PC000246',
    },
    {
      id: 3,
      date: '03/11/2024',
      modele: 'Samsung Galaxy S21',
      status: 'Réparation en cours',
      reparation: 'IR_PC000247',
    },
    {
      id: 4,
      date: '04/11/2024',
      modele: 'Dell XPS 13',
      status: 'En attente devis',
      reparation: 'IR_PC000248',
    },
    {
      id: 5,
      date: '05/11/2024',
      modele: 'HP Pavilion',
      status: 'Devis approuvé',
      reparation: 'IR_PC000249',
    },
  ];

  
  const hoverPopoverRef = useRef(null);

  

  return (
    <DashboardContent maxWidth="xl">
      <Box
        display="flex"
        alignItems="space-between"
        width="100%"
        flexDirection={{xs: 'column', md:'row'}}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
       <></>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <SearchReparation />
        </Grid>
        <Grid xs={12} md={6} container>
        
         
         <Grid xs={6} md={3}>
           <Button
             href={paths.dashboard.two}
             size="medium"
             color="success"
             variant="outlined"
             
             sx={{display: 'flex', flexDirection: 'column', height:'100%', width:'100%'}}
           >
              <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/caisse.png`} width={60}/>
              <Typography variant='Button'>Caisse</Typography>
           </Button>
         </Grid>
         <Grid xs={6} md={3}>
           <Button
            href={paths.dashboard.two}
            size="medium"
            color="warning"
            variant="outlined"
            sx={{display: 'flex', flexDirection: 'column', height:'100%', width:'100%'}}
           >
              <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/calendrier-hebdomadaire.png`} width={60}/>
              <Typography variant='Button'>Calendrier</Typography>
           </Button>
         </Grid>
         <Grid xs={6} md={3}>
         <Button
              href={paths.dashboard.two}
              variant="contained"
              color="primary"
              sx={{ height: '100%' }}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Iconify width={36} icon="ic:outline-sms" />
                Envoyer SMS
              </Box>
            </Button>
         </Grid>
         <Grid xs={6} md={3}>
         <Button
              href={paths.dashboard.two}
              variant="contained"
              color="secondary"
              sx={{ height: '100%'}}
              fullWidth
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Iconify width={36} icon="ic:outline-mail" />
                Envoyer Email
              </Box>
            </Button>
         </Grid>
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
            <CaisseCard title="Caisse" earning={25500} orderTotal={287650} currentBalance={187650} />
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
              color='error'
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
              color="secondary"
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
            title="Dernières Réparations"
            tableData={reparationsData}
            headLabel={[
              { id: 'date', label: 'Date' },
              { id: 'modele', label: 'Modèle' },
              { id: 'status', label: 'Statut' },
              { id: 'reparation', label: 'Réparation' },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
