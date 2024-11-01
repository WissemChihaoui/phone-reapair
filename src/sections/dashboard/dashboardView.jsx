import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { CONFIG } from 'src/config-global';

import React, { useState } from 'react'
import ReparationCard from 'src/components/dashboard/reparation-card/ReparationCard';
import SearchReparation from 'src/components/dashboard/search-reparation/SearchReparation'
import SearchVente from 'src/components/dashboard/search-vente/SearchVente';
import { DashboardContent } from 'src/layouts/dashboard'
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

export default function DashboardView() {
    // const periods= ["today", "month"]
   const transactionsData = [
    {
        id:1,
        date:"01/11/2024",
        client:"Jane Doe",
        amount: 111000,
        methode: "CB",
        employee: "Wissem"
    }
   ];
   const reparationsData = [
    {
        id:1,
        date:"01/11/2024",
        modele:"Macbook",
        status: "En attente devis",
        reparation: "IR_PC000245",
    }
   ];

    
  return (
    <DashboardContent maxWidth='xl'>
        <Box display='flex' justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 3, md: 5 } }}>
            <Typography variant="h4" >
               Bonjour, Wissem 👋
            </Typography>
            
        </Box>
        <Grid container spacing={3}>
            <Grid xs={12} md={6}>
                <SearchReparation />
            </Grid>  
            <Grid xs={12} md={6}>
                <SearchVente />
            </Grid>
            <Grid xs={12} md={4} lg={2.4}>
                <ReparationCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                      }
                    title="Réparations"
                    percent={2.6}
                    total={18}
                />    
            </Grid>  
            <Grid xs={12} md={4} lg={2.4}>
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
            <Grid xs={12} md={4} lg={2.4}>
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
            <Grid xs={12} md={6} lg={2.4}>
                <DemandeDevisCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-message.svg`} />
                      }
                    title="Demande de devis"
                    percent={0}
                    total={2}
                    color="error"
                />    
            </Grid>
            <Grid xs={12} md={6} lg={2.4}>
                <AchatsCard
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/wallet.svg`} />
                      }
                    title="Achats"
                    percent={0}
                    total={2}
                    color="info"
                />    
            </Grid>
            <Grid xs={12} md={4}>
                <CaisseCard
                 title="Caisse"
                 earning={25500}
                 orderTotal={287650}
                 currentBalance={187650}
                />
            </Grid>
            <Grid xs={12} md={6}>
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
            </Grid>
            <Grid xs={12} md={2}>
                <Box height='100%'>
                <Button  variant="contained" color='primary' sx={{height:'50%', borderRadius:"12px 12px 0 0"}} fullWidth>
                    <Box display="flex" flexDirection='column' alignItems='center'>
                        <Iconify width={36} icon='ic:outline-sms'/>
                        Envoyer SMS
                    </Box>
                </Button>
                <Button  variant="contained" color='secondary' sx={{height:'50%', borderRadius:"0 0 12px 12px"}} fullWidth>
                    <Box display="flex" flexDirection='column' alignItems='center'>
                        <Iconify width={36} icon='ic:outline-mail'/>
                        Envoyer Email
                    </Box>
                </Button>
                </Box>
            </Grid>
            <Grid xs={12}>
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
            </Grid>
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
  )
}
