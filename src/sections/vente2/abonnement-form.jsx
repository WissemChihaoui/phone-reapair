import React from 'react';
import { useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Button, TextField, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import AddAbonnementDialog from 'src/components/form-dialogs/abonnements';

const abonnementsList = [
  { label: 'Net+ Pro', price: 50, qte: 12, champ: 'Internet annuel' },
  { label: 'Mobile Pack', price: 30, qte: 6, champ: 'Offre mobile' },
];

export default function AbonnementForm({ index, onRemove }) {
  const add = useBoolean();
  const { register, setValue } = useFormContext();

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
                options={abonnementsList}
                getOptionLabel={(option) => option.label}
                onChange={handleSelect}
                renderInput={(params) => (
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    {...params}
                    label="Abonnement"
                    size="small"
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
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="Durée"
              type="number"
              {...register(`items.${index}.qte`, { valueAsNumber: true })}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="Prix"
              type="number"
              {...register(`items.${index}.price`, { valueAsNumber: true })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="Champ libre"
              {...register(`items.${index}.champ`)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label="Remise en euro TTC"
              type="number"
              {...register(`items.${index}.remise`, { valueAsNumber: true })}
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
      </Stack>

      <AddAbonnementDialog open={add.value} onClose={add.onFalse} />
    </>
  );
}
