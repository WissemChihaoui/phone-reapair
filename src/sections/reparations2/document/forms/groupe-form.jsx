import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Grid,
  Stack,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
  Autocomplete,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import PieceForm from './piece-form';

const GROUP_OPTIONS = [
  {
    value: 'group1',
    label: 'Smartphone Repair Kit',
    pieces: [
      { nom: 'Screen', qte: 1, price: 89.99 },
      { nom: 'Battery', qte: 1, price: 39.99 },
    ],
  },
  {
    value: 'group2',
    label: 'Laptop Maintenance Pack',
    pieces: [{ nom: 'Thermal Paste', qte: 1, price: 12.99 }],
  },
];

export default function GroupeForm({ data, onUpdate, onRemove }) {
  const { setValue } = useFormContext();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pieces, setPieces] = useState(data.pieces || []);

  const calculateTotal = (piecesArray) =>
    piecesArray
      .reduce((sum, piece) => {
        const price = parseFloat(piece.price) || 0;
        const qte = parseInt(piece.qte, 10) || 1;
        return sum + price * qte;
      }, 0)
      .toFixed(2);

  const handleGroupChange = (_, newValue) => {
    setSelectedGroup(newValue);
    const newPieces = newValue?.pieces || [];
    setPieces(newPieces);
    onUpdate({
      nom: newValue?.label || '',
      pieces: newPieces,
      price: calculateTotal(newPieces),
    });
  };

  const handlePieceUpdate = (index, newData) => {
    const updatedPieces = [...pieces];
    updatedPieces[index] = newData;
    setPieces(updatedPieces);
    onUpdate({
      pieces: updatedPieces,
      price: calculateTotal(updatedPieces),
    });
  };

  const handleAddPiece = () => {
    const newPiece = { nom: '', qte: 1, price: 0 };
    const updatedPieces = [...pieces, newPiece];
    setPieces(updatedPieces);
    onUpdate({ pieces: updatedPieces });
  };

  const handleRemovePiece = (index) => {
    const updatedPieces = pieces.filter((_, i) => i !== index);
    setPieces(updatedPieces);
    onUpdate({
      pieces: updatedPieces,
      price: calculateTotal(updatedPieces),
    });
  };

  return (
    <Stack spacing={2} sx={{ position: 'relative' }}>
      {/* <IconButton
        size="small"
        color="error"
        onClick={onRemove}
        sx={{ position: 'absolute', right: 0, top: 0 }}
      >
        <Iconify icon="mdi:delete" />
      </IconButton> */}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            noOptionsText="Pas de données"
            options={GROUP_OPTIONS}
            value={selectedGroup}
            onChange={handleGroupChange}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Regroupement" size="small" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Prix Total"
            type="number"
            value={data.price || 0}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={onRemove}
            startIcon={<Iconify icon="mdi:delete" />}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>

      {pieces.length > 0 && (
        <>
          <Typography variant="subtitle2">Pièces incluses:</Typography>
          <Stack spacing={2} sx={{ pl: 2, borderLeft: '2px dashed', borderColor: 'divider' }}>
            {pieces.map((piece, index) => (
              <PieceForm
                key={index}
                data={piece}
                onUpdate={(newData) => handlePieceUpdate(index, newData)}
                onRemove={() => handleRemovePiece(index)}
              />
            ))}
            <Button
              variant="outlined"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAddPiece}
            >
              Ajouter Pièce
            </Button>
          </Stack>
        </>
      )}
      <Divider sx={{ my: 1 }} />
    </Stack>
  );
}
