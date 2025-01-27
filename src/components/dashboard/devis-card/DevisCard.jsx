import { Box, Button, Card, IconButton, MenuItem, MenuList, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React, {useRef, useState, useCallback} from 'react'
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';
import { CONFIG } from 'src/config-global';
import { CustomPopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';

export default function DevisCard({
    color = 'primary',
    icon,
    percent,
    title,
    total,
}) {
    const theme = useTheme();
    const hoverPopoverRef = useRef(null);
    const hoverPopoverRef2 = useRef(null);
    const [hoverPopoverOpen, setHoverPopoverOpen] = useState(false);
    const [hoverPopoverOpen2, setHoverPopoverOpen2] = useState(false);
    const handleHoverPopoverOpen = useCallback(() => {
        setHoverPopoverOpen(true);
      }, []);
    const handleHoverPopoverOpen2 = useCallback(() => {
        setHoverPopoverOpen2(true);
      }, []);
    const handleHoverPopoverClose = useCallback(() => {
        setHoverPopoverOpen(false);
    }, []);
    const handleHoverPopoverClose2 = useCallback(() => {
        setHoverPopoverOpen2(false);
    }, []);
    const renderActions = (
        <Box
            sx={{
                top: 16,
                gap: 0.5,
                right: 16,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
            }} 
        >
          <div>
            <IconButton
              ref={hoverPopoverRef2}
              variant="outlined"
              onMouseEnter={handleHoverPopoverOpen2}
              onMouseLeave={handleHoverPopoverClose2}
              color={color}
              href={paths.dashboard.reparations.root}
            >
              <Iconify icon="eva:eye-fill" width={28}/>
            </IconButton>

            <CustomPopover
              open={hoverPopoverOpen2}
              anchorEl={hoverPopoverRef2.current}
              slotProps={{
                arrow: { placement: 'bottom-center' },
                paper: {
                  onMouseEnter: handleHoverPopoverOpen2,
                  onMouseLeave: handleHoverPopoverClose2,
                  sx: { ...(hoverPopoverOpen2 && { pointerEvents: 'auto' }) },
                },
              }}
              sx={{ pointerEvents: 'none' }}
            >
              <Box sx={{ p: 1, maxWidth: 280 }}>
                <Typography variant="body2">
                  Voir toutes les devis
                </Typography>
              </Box>
            </CustomPopover>
          </div>
          <div>
            <IconButton
              ref={hoverPopoverRef}
              variant="outlined"
              onMouseEnter={handleHoverPopoverOpen}
              onMouseLeave={handleHoverPopoverClose}
              color={color}
            >
              <Iconify icon="eva:plus-circle-fill" width={28}/>
            </IconButton>

            <CustomPopover
              open={hoverPopoverOpen}
              anchorEl={hoverPopoverRef.current}
              slotProps={{
                arrow: { placement: 'top-center' },
                paper: {
                  onMouseEnter: handleHoverPopoverOpen,
                  onMouseLeave: handleHoverPopoverClose,
                  sx: { ...(hoverPopoverOpen && { pointerEvents: 'auto' }) },
                },
              }}
              sx={{ pointerEvents: 'none' }}
            >
              <Box sx={{ p: 1, maxWidth: 280 }}>
                <Typography variant="body2">
                  Ajouter devis
                </Typography>
              </Box>
            </CustomPopover>
          </div>
        </Box>
    )

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
        {renderActions}
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
