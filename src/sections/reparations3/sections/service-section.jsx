import React from 'react';
import {
  useWatch,
  Controller,
  useFormContext,
} from 'react-hook-form';

import {
  Grid,
  Card,
  Stack,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { AddServiceDialog } from 'src/components/form-dialogs/service';
import { servicesList } from 'src/_mock/_reparations';

export default function ServiceSection({ index, onRemove }) {
  const { register, setValue, control, trigger } = useFormContext();
  const add = useBoolean();

  const watchPrice = useWatch({ name: `documents.${index}.data.price`, control });

  const handleSelect = (e, value) => {
    setValue(`documents.${index}.data.nom`, value);
    if (value?.price) {
      setValue(`documents.${index}.data.price`, value.price);
    }
    trigger(`documents.${index}.data.nom`);
  };

  return (
    <>
      <Grid container spacing={2} mb={2}>
        {/* Autocomplete: Service Name + Add Dialog */}
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={1}>
            <Controller
              name={`documents.${index}.data.nom`}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={servicesList}
                  getOptionLabel={(option) => option?.label || ''}
                  onChange={handleSelect}
                  isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Service"
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
            size="small"
            label="Prix"
            type="number"
            InputLabelProps={{ shrink: true }}
            {...register(`documents.${index}.data.price`, { valueAsNumber: true })}
          />
        </Grid>

        {/* Champ libre */}
        <Grid item xs={12} md={10}>
          <TextField
            fullWidth
            size="small"
            label="Champ libre"
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

      <AddServiceDialog open={add.value} onClose={add.onFalse} />
</>
  );
}
