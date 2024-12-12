import { Box, Card, } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React from 'react'
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { fPercent, fShortenNumber } from 'src/utils/format-number';
import { CONFIG } from 'src/config-global';
import { ProgressPec } from './progress-pec';


const _ecommerceSalesOverview = [
    {
        label: 'NB PEC payé',
        totalAmount: 9,
        value: 50,
    },
    {
        label: 'NB PEC non payé',
        totalAmount: 5,
        value: 30,
    },
    {
        label: 'NB PEC Partiellement payé',
        totalAmount: 4,
        value: 20,
    },
]

export default function PecDataCard({
    color = 'primary',
    icon,
    percent,
    title,
    total,
}) {
    const theme = useTheme();
    

    const renderTrending = (
        <Box
          sx={{
            top: 16,
            gap: 0.5,
            right: 16,
            display: 'flex',
            // position: 'absolute',
            alignItems: 'center',
          }}
        >
          <Iconify width={20} icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'} />
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Box>
        </Box>
      );
  return (
    <Card
    sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        height:'100%'
      }}
      >
        
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            }}
        >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
        <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>
          <Box sx={{ mb: 1, typography: 'subtitle1', fontWeight:'800' }}>{title}</Box>
          <Box sx={{ typography: 'h4' }}>{fShortenNumber(total)}</Box>
        </Box>
            <ProgressPec data={_ecommerceSalesOverview} />
      </Box>

      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
        
      />
      
      </Card>
  )
}
