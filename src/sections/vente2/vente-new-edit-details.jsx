import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack, Button, Divider } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import PieceForm from './piece-form';
import AbonnementForm from './abonnement-form';
import DividerItem from './devider-item';

export default function VenteNewEditDetails() {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');

  const handleAddAbonnement = () => {
    append({
      type: 'abonnement',
      nom: '',
      qte: 1,
      price: 0,
      champ: '',
      remise: 0,
      total: 0,
    });
  };

  const handleAddPiece = () => {
    append({
      type: 'piece',
      nom: '',
      qte: 1,
      price: 0,
      champ: '',
      remise: 0,
      total: 0,
    });
  };

  const handleAddDivider = () => {
    append({ type: 'divider' });
  };

  const handleUpdate = (index, newData) => {
    update(index, { ...fields[index], ...newData });
  };

  return (
    <Grid container spacing={2} py={2}>
      <Grid xs={12} md={3}>
        <Box p={4}>
          <Stack spacing={2}>
            <Button
              startIcon={<Iconify icon="mdi:plus" />}
              variant="contained"
              color="primary"
              onClick={handleAddPiece}
              fullWidth
            >
              Article / Accessoire
            </Button>
            <Button
              startIcon={<Iconify icon="mdi:plus" />}
              variant="contained"
              color="info"
              onClick={handleAddAbonnement}
              fullWidth
            >
              Abonnement
            </Button>
            <Button
              startIcon={<Iconify icon="mdi:minus" />}
              variant="outlined"
              color="secondary"
              onClick={handleAddDivider}
              fullWidth
            >
              Ligne de séparation
            </Button>
          </Stack>
        </Box>
      </Grid>

      <Grid xs={12} md={9}>
        <Stack spacing={3}>
          {fields.map((field, index) => {
            const data = items?.[index];

            if (!data) return null;

            if (data.type === 'abonnement') {
              return <AbonnementForm key={field.id} index={index} onRemove={() => remove(index)} />;
            }

            if (data.type === 'piece') {
              return (
                <PieceForm
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              );
            }

            if (data.type === 'divider') {
              return <DividerItem key={field.id} onRemove={() => remove(index)} />
            }

            return null;
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
