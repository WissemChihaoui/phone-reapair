import React, { useEffect } from 'react';
import { useWatch, Controller, useFormContext } from 'react-hook-form';

import { Grid, Stack, Button, TextField, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { piecesList } from 'src/_mock/_reparations';

import { Iconify } from 'src/components/iconify';
import { AddArticleDialog } from 'src/components/form-dialogs/article-rapide';

// Props: index (number), onRemove (function), piecesList (array)
export default function PieceSection({ index, onRemove }) {
  const { register, control, setValue, trigger } = useFormContext();
  const add = useBoolean();

  const watchQte = useWatch({ name: `documents.${index}.data.qte`, control });
  const watchPrice = useWatch({ name: `documents.${index}.data.price`, control });
  const watchRemise = useWatch({ name: `documents.${index}.data.remise`, control });

  // Auto calculate total
  useEffect(() => {
    const total = (watchQte || 0) * (watchPrice || 0) - (watchRemise || 0);
    setValue(`documents.${index}.data.total`, total);
    trigger(`documents.${index}.data.total`);
  }, [watchQte, watchPrice, watchRemise, index, setValue, trigger]);

  const handleSelect = (e, value) => {
    setValue(`documents.${index}.data.nom`, value);
    if (value?.price) {
      setValue(`documents.${index}.data.price`, value.price);
    }
  };

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
                  options={piecesList}
                  sx={{ width: 1 }}
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
            value={(watchQte || 0) * (watchPrice || 0) - (watchRemise || 0)}
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
