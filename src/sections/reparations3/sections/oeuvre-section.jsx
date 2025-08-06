import React, { useEffect } from 'react';
import {
  Grid,
  Stack,
  Button,
  Divider,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useWatch, Controller, useFormContext } from 'react-hook-form';

import { useBoolean } from 'src/hooks/use-boolean';
import { mainOeuvreList } from 'src/_mock/_reparations';

import { Iconify } from 'src/components/iconify';
import AddMainOuvreDialog from 'src/components/form-dialogs/main-ouvre';

export default function MainOeuvreSection({ index, onRemove }) {
  const { register, setValue, control, trigger } = useFormContext();
  const add = useBoolean();

  const price = useWatch({ name: `documents.${index}.data.price`, control });

  const handleSelect = (e, value) => {
    setValue(`documents.${index}.data.nom`, value);
    if (value?.price) {
      setValue(`documents.${index}.data.price`, value.price);
    }
    trigger(`documents.${index}.data.nom`);
  };

  // 🔁 Update total when price changes
  useEffect(() => {
    setValue(`documents.${index}.total`, price || 0);
  }, [price, setValue, index]);

  return (
    <>
      <Grid container spacing={2} mb={2}>
        {/* Autocomplete for nom */}
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Controller
              name={`documents.${index}.data.nom`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={mainOeuvreList}
                  getOptionLabel={(option) => option?.label || ''}
                  onChange={handleSelect}
                  isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Main d'œuvre"
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

        {/* Prix */}
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={10}>
          <TextField
            fullWidth
            label="Champ libre"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register(`documents.${index}.data.champ`)}
          />
        </Grid>

        {/* Supprimer */}
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={onRemove}
            startIcon={<Iconify icon="mdi:delete" />}
            sx={{ height: '100%' }}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>

      <AddMainOuvreDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}
