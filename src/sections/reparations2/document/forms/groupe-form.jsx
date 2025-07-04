import { useFormContext } from 'react-hook-form';
import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Button, Stack, Typography } from '@mui/material';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// Example options for Autocomplete - replace with your actual data
const OPTIONS = [
  { value: 'regroup1', label: 'Regroupement 1' },
  { value: 'regroup2', label: 'Regroupement 2' },
  { value: 'regroup3', label: 'Regroupement 3' },
];

export default function GroupeForm({ index: formIndex, formId, onRemove }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Regroupement</Typography>

      <Grid container spacing={2} key={formId}>
        <Grid xs={12} md={6}>
          <Field.Autocomplete
            size="small"
            name={`products[${formIndex}].oeuvre[${formId}].nom`}
            label="Regroupement"
            options={OPTIONS}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            // If your Field.Autocomplete expects value as an object, 
            // make sure your form default values have that structure too.
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].oeuvre[${formId}].price`}
            label="Prix"
            type="number"
          />
        </Grid>

        <Grid xs={12} md={2}>
          <Button
            variant="outlined"
            fullWidth
            color="error"
            onClick={() => onRemove(formId)}
            startIcon={<Iconify icon="mdi:delete" />}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}
