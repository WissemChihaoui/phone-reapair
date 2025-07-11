import React from 'react';
import { Card, Stack, TextField, IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export default function FamilleCard({ data, onChange, onDelete }) {
  const handleNameChange = (e) => {
    onChange({ ...data, name: e.target.value });
  };

  const handleDenominationChange = (e) => {
    onChange({ ...data, denomination: e.target.value });
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          label="Nom de la Famille"
          value={data.name}
          onChange={handleNameChange}
          fullWidth
        />
        <IconButton color="error" onClick={onDelete}>
          <Iconify icon="tabler:trash" />
        </IconButton>
      </Stack>

      <TextField
        sx={{ mt: 2 }}
        fullWidth
        label="Dénomination devant le nom du produit"
        value={data.denomination || ''}
        onChange={handleDenominationChange}
      />
    </Card>
  );
}
