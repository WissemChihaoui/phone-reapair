import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function ProgressPec({ data }) {
  return (
      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        {data.map((progress) => (
          <Item key={progress.label} progress={progress} />
        ))}
      </Box>
  );
}

// ----------------------------------------------------------------------

function Item({ progress }) {
  return (
    <div>
      <Box sx={{ mb: 1, gap: 0.5, display: 'flex', alignItems: 'center', typography: 'subtitle2' }}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Box>
        <Box component="span">{progress.totalAmount}</Box>
        <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
          ({fPercent(progress.value)})
        </Box>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'NB PEC payé' && 'success') ||
          (progress.label === 'NB PEC non payé' && 'error') ||
          'warning'
        }
        sx={{
          height: 8,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
        }}
      />
    </div>
  );
}
