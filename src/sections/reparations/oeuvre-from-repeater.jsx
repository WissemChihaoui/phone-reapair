import { Button, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function OeuvreFormRepeater({ index }) {
  const { control, watch, setValue } = useFormContext();
  const oeuvres = watch(`products[${index}].oeuvre`, []);

  const addPiece = () => {
    const newOeuvre = { 
        nom: '',
        price: null,
        champ: '',
     };
    setValue(`products[${index}].oeuvre`, [...oeuvres, newOeuvre]);
  };

  const removePiece = (pieceIndex) => {
    const updatedPieces = oeuvres.filter((_, i) => i !== pieceIndex);
    setValue(`products[${index}].oeuvre`, updatedPieces);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Main d&apos;oeuvre</Typography>
      {oeuvres.map((oeuvre, pieceIndex) => (
        <Grid container spacing={2} key={pieceIndex}>
          <Grid xs={12} md={8}>
            <Field.Text
            size='small'
              name={`products[${index}].oeuvre[${pieceIndex}].nom`}
              label="Main d'oeuvre"
              helperText="Champ libre (pas de gestion de stock)"
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
            size='small'
              name={`products[${index}].oeuvre[${pieceIndex}].price`}
              label="Prix"
              type="number"
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Field.Text
            size='small'
              name={`products[${index}].oeuvre[${pieceIndex}].champ`}
              label="Champ libre"
            />
          </Grid>
          
          <Grid xs={12} md={4}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removePiece(pieceIndex)}
              startIcon={<Iconify icon="mdi:delete" />}
            >
              Supprimer
            </Button>
          </Grid>
          <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
        </Grid>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={addPiece}
        startIcon={<Iconify icon="mdi:plus" />}
      >
        Ajouter main d&apos;oeuvre
      </Button>
    </Stack>
  );
}
