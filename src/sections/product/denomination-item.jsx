import React from 'react';

import { Stack, TextField, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function DenominationItem({ label, onChange, onDelete }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        fullWidth
        label="Dénomination"
        value={label}
        onChange={(e) => onChange(e.target.value)}
      />
      <IconButton color="error" onClick={onDelete}>
        <Iconify icon="tabler:trash" />
      </IconButton>
    </Stack>
  );
}
