import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Button, Typography } from '@mui/material';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function PieceForm({ index: formIndex, formId, onRemove }) {
  const { control } = useFormContext();

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Piéce à changer</Typography>

      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].piece[${formIndex}].nom`}
            label="Pièce à changer / Article:"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].piece[${formIndex}].qte`}
            label="Quantité"
            type="number"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].piece[${formIndex}].price`}
            label="Prix"
            type="number"
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].piece[${formIndex}].champ`}
            label="Champ libre"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].piece[${formIndex}].remise`}
            label="Remise en euro TTC"
            type="number"
          />
        </Grid>
        <Grid xs={12} md={2}>
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
