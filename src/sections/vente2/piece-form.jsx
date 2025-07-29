import React from 'react';
import { useWatch, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Button, TextField, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { AddArticleDialog } from 'src/components/form-dialogs/article-rapide';

const piecesList = [
  { label: 'Batterie iPhone', price: 80, qte: 1, champ: 'iPhone 11' },
  { label: 'Écran Samsung', price: 120, qte: 1, champ: 'Galaxy S21' },
];

export default function PieceForm({ index, onRemove }) {
  const { register, setValue, control } = useFormContext();
  const add = useBoolean();

  const selectedNom = useWatch({ control, name: `items.${index}.nom` });

  const handleSelect = (event, selected) => {
    if (selected) {
      setValue(`items.${index}.nom`, selected.label);
      setValue(`items.${index}.price`, selected.price);
      setValue(`items.${index}.qte`, selected.qte);
      setValue(`items.${index}.champ`, selected.champ);
      setValue(`items.${index}.remise`, 0);
      setValue(`items.${index}.total`, selected.price * selected.qte);
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={0.5}>
              <Autocomplete
                fullWidth
                options={piecesList}
                getOptionLabel={(option) => option.label}
                value={piecesList.find((item) => item.label === selectedNom) || null}
                onChange={handleSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pièce à changer"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
              <Button onClick={add.onTrue} color="success" variant="contained">
                <Iconify icon="ic:round-plus" />
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Quantité"
              type="number"
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register(`items.${index}.qte`, { valueAsNumber: true })}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Prix"
              type="number"
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register(`items.${index}.price`, { valueAsNumber: true })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Champ libre"
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register(`items.${index}.champ`)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Remise (€)"
              type="number"
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register(`items.${index}.remise`, { valueAsNumber: true })}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={onRemove}
              startIcon={<Iconify icon="mdi:delete" />}
            >
              Supprimer
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <AddArticleDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}
