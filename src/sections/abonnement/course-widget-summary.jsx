import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { fPercent, fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AbonnementWidgetSummary({ title, percent, data, total, icon, sx, ...other }) {
  

  return (
    <Card
      sx={{
        p: 2,
        pl: 3,
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>
        <Box sx={{ my: 1.5, typography: 'h3' }}>{data}</Box>
      </Box>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {icon}
      </Box>
    </Card>
  );
}