import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export function StockWidget({ sx, icon, title, total, color = 'warning', ...other }) {
  return (
    <Card sx={{ py: 3, pl: 3, pr: 2.5, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: 'h3' }}>{fNumber(total)}</Box>
        <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>
      <img src={icon} alt={title} style={{position:"absolute", width:"56px", height:"56px", top:"24px", right:"20px"}}/>

      {/* <img
        src={icon}
        style={{
          top: '24',
          right: '20',
          width: '36',
          height: '36',
          position: 'absolute',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.vars.palette[color].main} 0%, ${theme.vars.palette[color].dark} 100%)`,
        }}
      /> */}

      <Box
        sx={{
          top: -44,
          width: 160,
          zIndex: -1,
          height: 160,
          right: -104,
          opacity: 0.12,
          borderRadius: 3,
          position: 'absolute',
          transform: 'rotate(40deg)',
          background: (theme) =>
            `linear-gradient(to right, ${
              theme.vars.palette[color].main
            } 0%, ${varAlpha(theme.vars.palette[color].mainChannel, 0)} 100%)`,
        }}
      />
    </Card>
  );
}
