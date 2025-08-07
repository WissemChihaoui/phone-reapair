import React, { useEffect } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
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
  const { register, control, setValue } = useFormContext();

  const add = useBoolean();

  // ✅ Watch only this piece's data
  const data = useWatch({ control, name: `documents.${index}.data` }) || {};

  // ✅ Update total & totalNet when needed
  useEffect(() => {
    const qte = Number(data.qte || 0);
    const price = Number(data.price || 0);
    const remise = Number(data.remise || 0);

    const totalNet = qte * price;
    const total = totalNet - remise;

    setValue(`documents.${index}.data.totalNet`, totalNet);
    setValue(`documents.${index}.data.total`, total);
  }, [data.qte, data.price, data.remise, index, setValue]);

  // ✅ When selecting an article
  const handleSelect = (e, value) => {
    if (!value) return;

    setValue(`documents.${index}.data.nom`, value);
    setValue(`documents.${index}.data.price`, value.price);
    setValue(`documents.${index}.data.qte`, 1);
    setValue(`documents.${index}.data.remise`, 0);
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
            {...register(`documents.${index}.data.qte`)}
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
            {...register(`documents.${index}.data.price`)}
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
            {...register(`documents.${index}.data.remise`)}
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
            value={data.total?.toFixed(2) || ''}
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
