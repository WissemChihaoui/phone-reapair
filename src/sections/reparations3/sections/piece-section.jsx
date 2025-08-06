import React, { useEffect } from 'react';
import { useWatch, Controller, useFormContext } from 'react-hook-form';
import {
  Grid,
  Stack,
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { piecesList } from 'src/_mock/_reparations';
import { Iconify } from 'src/components/iconify';
import { AddArticleDialog } from 'src/components/form-dialogs/article-rapide';

export default function PieceSection({ index, onRemove }) {
  const { register, control, setValue, getValues, trigger } = useFormContext();
  const add = useBoolean();

  const qte = useWatch({ name: `documents.${index}.data.qte`, control });
  const price = useWatch({ name: `documents.${index}.data.price`, control });
  const remise = useWatch({ name: `documents.${index}.data.remise`, control });

  const total = (qte || 0) * (price || 0) - (remise || 0);

  // Handle selecting article from autocomplete
  const handleSelect = (e, value) => {
    setValue(`documents.${index}.data.nom`, value);
    if (value?.price) {
      setValue(`documents.${index}.data.price`, value.price);
      setValue(`documents.${index}.data.qte`, 1);
    }
  };

  // Update piece total + trigger recalculating global totals
  useEffect(() => {
    setValue(`documents.${index}.data.total`, total);

    // Calculate global total & remise from all document items
    const documents = getValues('documents') || [];
    let globalTotal = 0;
    let globalRemise = 0;

    documents.forEach((doc, i) => {
      const d = doc?.data || {};
      const t = (d.qte || 0) * (d.price || 0);
      globalTotal += t;
      globalRemise += d.remise || 0;

      // Optionally update each piece total individually if not current
      if (i !== index) {
        setValue(`documents.${i}.data.total`, t - (d.remise || 0));
      }
    });

    // Save the updated global totals in form state
    setValue('total', globalTotal);
    setValue('remise', globalRemise);

    trigger(['total', 'remise']);
  }, [qte, price, remise, index, setValue, getValues, trigger, total]);

  return (
    <>
      <Grid container spacing={2} mb={2}>
        {/* Nom */}
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={1}>
            <Controller
              name={`documents.${index}.data.nom`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={piecesList}
                  onChange={handleSelect}
                  getOptionLabel={(option) => option?.label || ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Article / Accessoire"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              )}
            />
            <Button onClick={add.onTrue} color="success" variant="contained">
              <Iconify icon="ic:round-plus" />
            </Button>
          </Stack>
        </Grid>

        {/* Quantité */}
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="Quantité"
            type="number"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register(`documents.${index}.data.qte`, { valueAsNumber: true })}
          />
        </Grid>

        {/* Prix */}
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            label="Prix"
            type="number"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register(`documents.${index}.data.price`, { valueAsNumber: true })}
          />
        </Grid>

        {/* Champ libre */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Champ libre"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register(`documents.${index}.data.champ`)}
          />
        </Grid>

        {/* Remise */}
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Remise (€)"
            type="number"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register(`documents.${index}.data.remise`, { valueAsNumber: true })}
          />
        </Grid>

        {/* Total */}
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Total"
            size="small"
            disabled
            InputLabelProps={{ shrink: true }}
            value={total.toFixed(2)}
          />
        </Grid>

        {/* Delete */}
        <Grid item xs={12} md={2}>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={onRemove}
            startIcon={<Iconify icon="mdi:delete" />}
            sx={{ height: '100%' }}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>

      <AddArticleDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}
