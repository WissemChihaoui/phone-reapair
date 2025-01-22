import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { fCurrency } from 'src/utils/format-number';

export default function TotalView() {

  const { watch } = useFormContext();

  const values = watch();

  return (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Total HT</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(values.subTotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Remise</Box>
        <Box sx={{ width: 160, ...(values.remiseTotale && { color: 'error.main' }) }}>
          {values.remiseTotale ? `- ${fCurrency(values.remiseTotale)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Total Quantités</Box>
        <Box sx={{ width: 160 }}>{values.quantities ? values.quantities : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(values.total) || '-'}</Box>
      </Stack>
    </Stack>
  );
}
