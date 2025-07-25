import React from 'react';

import { Grid, Stack, Button, Divider, TextField } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import AddMainOuvreDialog from 'src/components/form-dialogs/main-ouvre';

export default function OeuvreForm({ data, onUpdate, onRemove }) {
  const add = useBoolean()
  const handleChange = (field) => (e) => {
    const newData = {
      ...data,
      [field]: e.target.value,
    };

    // Auto-calculate total when price changes
    if (field === 'price') {
      const price = parseFloat(newData.price) || 0;
      newData.total = price.toFixed(2);
    }

    onUpdate(newData);
  };

  return (
    <>
    <Stack spacing={2} sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={0.5}>
            <TextField
              fullWidth
              sx={{ flexGrow: 1 }}
              size="small"
              label="Main d'oeuvre"
              helperText="Champ libre (pas de gestion de stock)"
              value={data.nom || ''}
              onChange={handleChange('nom')}
            />
            <Button onClick={add.onTrue} color="success" size='small' variant="contained">
              <Iconify icon="ic:round-plus" />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Prix"
            type="number"
            value={data.price || 0}
            onChange={handleChange('price')}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            fullWidth
            size="small"
            label="Champ libre"
            value={data.champ || ''}
            onChange={handleChange('champ')}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={onRemove}
            startIcon={<Iconify icon="mdi:delete" />}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
    </Stack>
    <AddMainOuvreDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}
