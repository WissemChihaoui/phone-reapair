import React, { useState } from 'react';

import { Grid, Stack, Button, Divider, TextField, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import AddMainOuvreDialog from 'src/components/form-dialogs/main-ouvre';

const PIECE_OPTIONS = [
  {
    value: 'oeuvre1',
    label: 'Oeuvre 1',
    price: 100,
  },
  {
    value: 'oeuvre2',
    label: 'Oeuvre 2',
    price: 250,
  },
];

export default function OeuvreForm({ data, onUpdate, onRemove }) {
  const add = useBoolean();
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupChange = (event, newValue) => {
    setSelectedGroup(newValue); // ✅ store full object

    console.log(newValue);
    console.log(selectedGroup);

    if (newValue) {
      const price = parseFloat(newValue.price) || 0;
      const updatedData = {
        ...data,
        nom: newValue.label,
        price,
        total: price.toFixed(2),
      };
      onUpdate(updatedData);
    }
  };

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
              <Autocomplete
                fullWidth
                options={PIECE_OPTIONS}
                value={data?.nom}
                onChange={handleGroupChange}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Main d'ouevre" margin="none" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />

              <Button onClick={add.onTrue} color="success" size="small" variant="contained">
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
