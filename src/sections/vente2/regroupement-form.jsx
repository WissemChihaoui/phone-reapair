// components/forms/regroupement-form.jsx
import React, { useState } from 'react';

import { Box, Stack, Button, Divider, TextField, Autocomplete } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import PieceForm from './piece-form';

const regroupements = [
  {
    label: 'Pack Protection Téléphone',
    items: [
      { nom: 'Coque', qte: 1, price: 15 },
      { nom: 'Verre Trempé', qte: 1, price: 10 },
      { nom: 'Écouteur', qte: 1, price: 20 },
    ],
  },
  {
    label: 'Kit Bureau',
    items: [
      { nom: 'Souris', qte: 1, price: 12 },
      { nom: 'Tapis Souris', qte: 1, price: 5 },
    ],
  },
];

export default function RegroupementForm({ onSubmit, onCancel }) {
  const [selected, setSelected] = useState(null);

  const handleAdd = () => {
    if (!selected) return;

    const preparedItems = selected.items.map((item) => ({
      type: 'piece',
      nom: item.nom,
      qte: item.qte ?? 1,
      price: item.price ?? 0,
      champ: '',
      remise: 0,
      total: 0,
    }));

    onSubmit(preparedItems);
  };

  return (
    <Box p={2} border="1px solid #ddd" borderRadius={2}>
      <Stack spacing={2}>
        <Autocomplete
          options={regroupements}
          getOptionLabel={(option) => option.label}
          value={selected}
          onChange={(e, val) => setSelected(val)}
          renderInput={(params) => <TextField {...params} label="Choisir un regroupement" />}
        />

        {selected && (
          <>
            <Divider />
            <Stack spacing={1}>
              {selected.items.map((item, idx) => (
                <Box key={idx}>
                  <PieceForm
                    index={idx}
                    isPreview
                    defaultValues={{
                      nom: item.nom,
                      qte: item.qte,
                      price: item.price,
                      champ: '',
                      remise: 0,
                      total: 0,
                    }}
                    onRemove={null}
                  />
                </Box>
              ))}
            </Stack>
          </>
        )}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="warning"
            startIcon={<Iconify icon="mdi:check" />}
            disabled={!selected}
            onClick={handleAdd}
          >
            Ajouter
          </Button>
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
