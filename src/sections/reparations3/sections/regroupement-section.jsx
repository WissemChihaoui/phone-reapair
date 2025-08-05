import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import {
  Grid,
  Stack,
  Button,
  TextField,
  Autocomplete,
  Typography,
  Divider,
  Card,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import AddRegroupementDialog from 'src/components/form-dialogs/regroupement';

// import { AddRegroupementDialog } from 'src/components/form-dialogs/regroupement-rapide';

// import { regroupementOptions } from 'src/_mock/_reparations';

const regroupementOptions =[
  {
    value: 'g1',
    label: 'Pack réparation écran',
    pieces: [
      { label: 'Écran Samsung S21', value: 'screen-1', price: 120 },
      { label: 'Adhésif écran', value: 'glue-5', price: 5 },
    ]
  },
]
export default function RegroupementSection({ index, onRemove }) {
  const { control, setValue } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'documents',
  });

  const add = useBoolean();
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupChange = (e, group) => {
    setSelectedGroup(group);

    if (!group || !group.pieces?.length) return;

    const newPieceItems = group.pieces.map((piece) => ({
      type: 'piece',
      data: {
        nom: piece, // piece is an object with label, value, price
        qte: 1,
        price: piece.price,
        remise: 0,
        champ: '',
        total: piece.price,
        fromGroup: group.value, // mark it's from a regroupement
      },
    }));

    // Insert right after the regroupement
    const insertAt = index + 1;
    newPieceItems.forEach((item, i) => {
      append(item, { shouldFocus: false });
    });

    setValue(`documents.${index}.data.groupLabel`, group.label);
    setValue(`documents.${index}.data.groupValue`, group.value);
    setValue(`documents.${index}.data.price`, group.pieces.reduce((acc, p) => acc + p.price, 0));
  };

  // Remove this group and all following items with matching fromGroup
  const handleRemoveGroup = () => {
    const currentFields = fields; // all documents
    const groupKey = selectedGroup?.value;

    // Get indexes of pieces added by this group
    const indexesToRemove = currentFields.reduce((acc, item, idx) => {
      if (idx === index) return acc; // regroupement itself
      if (item.type === 'piece' && item.data?.fromGroup === groupKey) acc.push(idx);
      return acc;
    }, []);

    // First remove the group itself
    onRemove();

    // Then remove related pieces in reverse order
    indexesToRemove.sort((a, b) => b - a).forEach((i) => remove(i));
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Regroupement
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={0.5}>
            <Autocomplete
              sx={{ flexGrow: 1 }}
              noOptionsText="Pas de données"
              options={regroupementOptions}
              value={selectedGroup}
              onChange={handleGroupChange}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Regroupement" size="small" />
              )}
            />
            <Button onClick={add.onTrue} color="success" variant="contained">
              <Iconify icon="ic:round-plus" />
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Prix Total"
            type="number"
            value={
              selectedGroup?.pieces?.reduce((acc, p) => acc + p.price, 0) || 0
            }
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleRemoveGroup}
            startIcon={<Iconify icon="mdi:delete" />}
            sx={{ height: '100%' }}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <AddRegroupementDialog open={add.value} onClose={add.onFalse} />
    </Card>
  );
}
