import { Box, MenuItem, Select, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { CONFIG } from 'src/config-global';

import React, { useState } from 'react'
import ReparationCard from 'src/components/dashboard/reparation-card/ReparationCard';
import SearchReparation from 'src/components/dashboard/search-reparation/SearchReparation'
import SearchVente from 'src/components/dashboard/search-vente/SearchVente';
import { DashboardContent } from 'src/layouts/dashboard'
import { Iconify } from 'src/components/iconify';

export default function DashboardView() {
    // const periods= ["today", "month"]
    const periods = [
        {label: "Ce Jour", value:"today"},
        {label: "Ce Mois", value:"month"}
    ]
    const [periodView, setPeriodView] = useState("today");

    
  return (
    <DashboardContent maxWidth='xl'>
        <Box display='flex' justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 3, md: 5 } }}>
            <Typography variant="h4" >
               Bonjour, Wissem 👋
            </Typography>
            <Select size='small' color='primary' value={periodView} sx={{height:"min-content"}} onChange={(e)=>setPeriodView(e.target.value)}>
                {periods.map((period, index) => (
                    <MenuItem value={period.value} key={index}>
                        {period.label}
                    </MenuItem>
                ))}
            </Select>
        </Box>
        <Grid container spacing={3}>
            <Grid xs={12} md={6}>
                <SearchReparation />
            </Grid>  
            <Grid xs={12} md={6}>
                <SearchVente />
            </Grid>
            <Grid xs={12} md={3}>
                <ReparationCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                      }
                    title="Réparations"
                    percent={2.6}
                    total={18}
                />    
            </Grid>  
            <Grid xs={12} md={3}>
                <ReparationCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                      }
                    title="Réparations"
                    percent={2.6}
                    total={18}
                    color="secondary"
                />    
            </Grid>  
            <Grid xs={12} md={3}>
                <ReparationCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                      }
                    title="Réparations"
                    percent={2.6}
                    total={18}
                    color="warning"
                />    
            </Grid>  
            <Grid xs={12} md={3}>
                <ReparationCard 
                    icon={
                        <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`} />
                      }
                    title="Réparations"
                    percent={2.6}
                    total={18}
                    color="error"
                />    
            </Grid>  
        </Grid>
    </DashboardContent>
  )
}
