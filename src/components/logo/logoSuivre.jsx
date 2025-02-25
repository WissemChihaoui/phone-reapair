import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CONFIG } from 'src/config-global';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';
// ----------------------------------------------------------------------

export const LogoSuivre = forwardRef(
  (
    { width, href = '/', height, isSingle = false, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const theme = useTheme();

    const gradientId = useId();

    const TEXT_PRIMARY = theme.vars.palette.text.primary;
    const PRIMARY_LIGHT = theme.vars.palette.primary.light;
    const PRIMARY_MAIN = theme.vars.palette.primary.main;
    const PRIMARY_DARKER = theme.vars.palette.primary.dark;

    /*
  * OR using local (public folder)
  *
  

  
  *
  */

  const singleLogo = (
    <Box
      alt="Single logo"
      component="img"
      src={`${CONFIG.assetsDir}/logo/oneSuivi.png`}
      width="100%"
      height="50%"
    />
  );

  const fullLogo = (
    <Box
      alt="Full logo"
      component="img"
      src={`${CONFIG.assetsDir}/logo/oneSuivi.png`}
      width="100%"
      height="100%"
    />
  );
    const baseSize = {
      height: 40,
      ...(!isSingle && {
        height: 30,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
