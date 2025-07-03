import { Button, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function PieceFormRepeater({ index }) {
  const { control, watch, setValue } = useFormContext();
  const pieces = watch(`products[${index}].piece`, []);
  const oeuvre = watch(`products[${index}].oeuvre`, []);

  // Function to add a new piece to the list
  const addPiece = useCallback(() => {
    const newPiece = {
      nom: '',
      qte: null,
      price: null,
      champ: '',
      remise: null,
      totalHT: 0, // Initialized to 0
    };
    setValue(`products[${index}].piece`, [...pieces, newPiece]);
  }, [pieces, index, setValue]);

  // Function to remove a specific piece from the list
  const removePiece = useCallback(
    (pieceIndex) => {
      const updatedPieces = pieces.filter((_, i) => i !== pieceIndex);
      setValue(`products[${index}].piece`, updatedPieces);
    },
    [pieces, index, setValue]
  );

  
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Les interventions</Typography>
      {pieces.map((piece, pieceIndex) => (
        <Grid container spacing={2} key={pieceIndex}>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${index}].piece[${pieceIndex}].nom`}
              label="Pièce à changer / Article:"
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${index}].piece[${pieceIndex}].qte`}
              label="Quantité"
              type="number"
              // onChange={(event) => handleChangeQuantity(event, pieceIndex)}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${index}].piece[${pieceIndex}].price`}
              label="Prix"
              type="number"
              // onChange={(event) => handleChangePrice(event, pieceIndex)}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text
              size="small"
              name={`products[${index}].piece[${pieceIndex}].champ`}
              label="Champ libre"
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${index}].piece[${pieceIndex}].remise`}
              label="Remise en euro TTC"
              type='number'
            />
          </Grid>
          <Grid xs={12} md={2}>
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
        Ajouter pièce
      </Button>
    </Stack>
  );
}
