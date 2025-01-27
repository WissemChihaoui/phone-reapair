import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { fCurrency } from 'src/utils/format-number';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function CaisseCard({
  sx,
  title,
  earning,
  refunded,
  orderTotal,
  currentBalance,
  ...other
}) {
    const periods = [
        {label: "Ce Jour", value:"today"},
        {label: "Ce Mois", value:"month"}
    ]
    const [periodView, setPeriodView] = useState("today");
    
  const row = (label, value) => (
    <Box sx={{ display: 'flex', typography: 'body2', justifyContent: 'space-between' }}>
      <Box component="span" sx={{ color: 'text.secondary' }}>
        {label}
      </Box>
      <Box component="span">{fCurrency(value)}</Box>
    </Box>
  );

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1, typography: 'subtitle2' }}>{title}
      <Select size='small' color='primary' value={periodView} sx={{height:"min-content"}} onChange={(e)=>setPeriodView(e.target.value)}>
                {periods.map((period, index) => (
                    <MenuItem value={period.value} key={index}>
                        {period.label}
                    </MenuItem>
                ))}
            </Select>
      </Box>

      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ typography: 'h3' }}>{fCurrency(currentBalance)}</Box>

        {row('Réparations', orderTotal)}
        {row('Ventes', earning)}

        <Box sx={{ gap: 2, display: 'flex' }}>
          <Button href={paths.dashboard.reparations.root} fullWidth variant="contained" color="primary">
            Réparations
          </Button>

          <Button href={paths.dashboard.vente.root} fullWidth variant="contained" color="warning">
            Ventes
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
