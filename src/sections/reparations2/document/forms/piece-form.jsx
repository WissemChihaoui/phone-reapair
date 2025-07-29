import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Button, TextField } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { AddArticleDialog } from 'src/components/form-dialogs/article-rapide';

export default function PieceForm({ data, onUpdate, onRemove }) {
  const add = useBoolean()
  const handleChange = (field) => (e) => {
    const newData = {
      ...data,
      [field]: e.target.value,
    };

    // Auto-calculate total when price, quantity or discount changes
    if (['price', 'qte', 'remise'].includes(field)) {
      const price = parseFloat(newData.price) || 0;
      const qte = parseInt(newData.qte, 10) || 1;
      const remise = parseFloat(newData.remise) || 0;
      newData.total = (price * qte - remise).toFixed(2);
    }

    onUpdate(newData);
  };

  return (
    <>
    <Stack spacing={2} sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={0.5}>
            <TextField
              fullWidth
              size="small"
              name="nom"
              label="Pièce à changer / Article / Accessoire"
              value={data.nom || ''}
              onChange={handleChange('nom')}
            />
            <Button onClick={add.onTrue} color="success" variant="contained">
              <Iconify icon="ic:round-plus" />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Quantité"
            type="number"
            value={data.qte || 1}
            onChange={handleChange('qte')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Prix"
            type="number"
            value={data.price || 0}
            onChange={handleChange('price')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            label="Champ libre"
            value={data.champ || ''}
            onChange={handleChange('champ')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Remise en euro TTC"
            type="number"
            value={data.remise || 0}
            onChange={handleChange('remise')}
          />
        </Grid>
        <Grid xs={12} md={2}>
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
    <AddArticleDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}
