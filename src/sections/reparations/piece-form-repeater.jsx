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

  // Function to handle quantity change and update totalHT dynamically
  const handleChangeQuantity = useCallback(
    (event, pieceIndex) => {
      const newQuantity = Number(event.target.value);
      setValue(`products[${index}].piece[${pieceIndex}].qte`, newQuantity);

      // Calculate the new totalHT for the piece
      const price = parseFloat(watch(`products[${index}].piece[${pieceIndex}].price`)) || 0;
      setValue(`products[${index}].piece[${pieceIndex}].totalHT`, newQuantity * price);
    },
    [setValue, watch, index]
  );

  // Function to handle price change and update totalHT dynamically
  const handleChangePrice = useCallback(
    (event, pieceIndex) => {
      const newPrice = Number(event.target.value);
      setValue(`products[${index}].piece[${pieceIndex}].price`, newPrice);

      // Calculate the new totalHT for the piece
      const quantity = parseInt(watch(`products[${index}].piece[${pieceIndex}].qte`), 10) || 0;
      setValue(`products[${index}].piece[${pieceIndex}].totalHT`, quantity * newPrice);
    },
    [setValue, watch, index]
  );
  const totalHT = pieces.reduce((sum, piece) => sum + (piece.totalHT || 0), 0);
  const totalOeuvre = oeuvre.reduce((sum, piece) => sum + (piece.price || 0), 0);
  const totalRemise = pieces.reduce((sum, piece) => sum + (parseFloat(piece.remise) || 0), 0);
  const totalAmount = parseFloat(totalHT) + parseFloat(totalOeuvre);
  const handleTotalSingleProduct = useCallback(
    (event) => {
      setValue(`products[${index}].totalHT`,  totalAmount )
      setValue(`products[${index}].totalRemise`,totalRemise )
    },
    [setValue, index,  totalRemise, totalAmount]
  )
  useEffect(()=> {
    handleTotalSingleProduct()
  },[totalHT,totalRemise, handleTotalSingleProduct,totalAmount])
  
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
              onChange={(event) => handleChangeQuantity(event, pieceIndex)}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${index}].piece[${pieceIndex}].price`}
              label="Prix"
              type="number"
              onChange={(event) => handleChangePrice(event, pieceIndex)}
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
          <Grid xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              Total HT: {piece.totalHT || 0} €
            </Typography>
          </Grid>
          <Divider sx={{ borderStyle: 'dashed', width: '100%' }} />
        </Grid>
      ))}
      <Typography variant="subtitle1" color="text.primary">
        Total HT de tous les pièces: {totalHT} €
      </Typography>
      <Typography variant="subtitle1" color="text.primary">
        Total Remise: {totalRemise} €
      </Typography>
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
