import { Box, MenuItem, Select, Typography } from '@mui/material'
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

export default function DashboardView() {
    // const periods= ["today", "month"]
   

    
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
            <Grid xs={12} md={2.4}>
                <ReparationCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                      }
                    title="Réparations"
                    percent={2.6}
                    total={18}
                />    
            </Grid>  
            <Grid xs={12} md={2.4}>
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
            <Grid xs={12} md={2.4}>
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
            <Grid xs={12} md={2.4}>
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
            <Grid xs={12} md={2.4}>
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
        </Grid>
    </DashboardContent>
  )
}
