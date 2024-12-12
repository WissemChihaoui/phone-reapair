import { Box, Card, } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React from 'react'
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { fPercent, fShortenNumber } from 'src/utils/format-number';
import { CONFIG } from 'src/config-global';

export default function DataCardStatistics({
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
        <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>
        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: 'subtitle1', fontWeight:'800' }}>{title}</Box>
          <Box sx={{ typography: 'h4' }}>{fShortenNumber(total)}</Box>
        </Box>
        {renderTrending}
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
