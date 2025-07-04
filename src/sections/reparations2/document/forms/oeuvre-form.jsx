import { useFormContext } from 'react-hook-form';
import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Button, Divider, Stack, Typography } from '@mui/material';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function OeuvreForm({ index: formIndex, formId, onRemove }) {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Main d&apos;oeuvre</Typography>

      <Grid container spacing={2} key={formId}>
        <Grid xs={12} md={8}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].oeuvre[${formId}].nom`}
            label="Main d'oeuvre"
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
        <Grid xs={12} md={8}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].oeuvre[${formId}].champ`}
            label="Champ libre"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Button
            variant="outlined"
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
