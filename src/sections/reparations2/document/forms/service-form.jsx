import React from 'react';
import { Grid, Stack, Divider, TextField, IconButton, Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { AddServiceDialog } from 'src/components/form-dialogs/service';
import { useBoolean } from 'src/hooks/use-boolean';

export default function ServiceForm({ data, onUpdate, onRemove }) {
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
            size="small"
            label="Service"
            value={data.nom || ''}
            onChange={handleChange('nom')}
          />
          <Button onClick={add.onTrue} color="success" variant="contained">
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
        <Grid item xs={8} md={10}>
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
    </Stack>
    <AddServiceDialog open={add.value} onClose={add.onFalse}/>
    </>
  );
}
