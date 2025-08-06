import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';

import { Stack, Typography, IconButton, Grid, TextField, Autocomplete, Divider } from '@mui/material';
import { Iconify } from 'src/components/iconify';

const REGROUPEMENTS = [
  {
    id: 'group1',
    label: 'Smartphone Repair Kit',
    pieces: [
      { nom: 'Screen', qte: 1, price: 89.99 },
      { nom: 'Battery', qte: 1, price: 39.99 },
    ],
  },
  {
    id: 'group2',
    label: 'Laptop Maintenance Pack',
    pieces: [
      { nom: 'Thermal Paste', qte: 1, price: 12.99 },
    ],
  },
];

export default function RegroupementSection({ index, onRemove }) {
  const { control, setValue } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: `documents.${index}.data`, // pieces nested in this regroupement
  });

  const handleGroupChange = (event, newValue) => {
    if (!newValue) return;

    const selectedPieces = newValue.pieces.map(piece => ({
      ...piece,
    }));

    // Set regroupement name
    setValue(`documents.${index}.nom`, newValue.label);
    // Reset the pieces
    setValue(`documents.${index}.data`, selectedPieces);
  };

  return (
    <Stack spacing={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Controller
            name={`documents.${index}.regroupement`}
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={REGROUPEMENTS}
                getOptionLabel={(option) => option?.label || ''}
                onChange={handleGroupChange}
                renderInput={(params) => <TextField {...params} label="Regroupement" size="small" />}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <IconButton color="error" onClick={onRemove}>
            <Iconify icon="mdi:delete" />
          </IconButton>
        </Grid>
      </Grid>

      {fields.length > 0 && (
        <>
          <Divider />
          <Typography variant="subtitle2">Pièces:</Typography>
          <Stack spacing={2} sx={{ pl: 2, borderLeft: '2px dashed #ccc' }}>
            {fields.map((piece, pieceIndex) => (
              <Grid container spacing={2} key={piece.id}>
                <Grid item xs={12} md={4}>
                  <TextField
                    size="small"
                    label="Nom"
                    value={piece.nom}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name={`documents.${index}.data.${pieceIndex}.qte`}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} size="small" label="Quantité" type="number" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name={`documents.${index}.data.${pieceIndex}.price`}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} size="small" label="Prix" type="number" fullWidth />
                    )}
                  />
                </Grid>
              </Grid>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
}
