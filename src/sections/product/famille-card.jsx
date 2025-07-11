import React from 'react';

import {
  Card, Stack, Button, TextField, IconButton, Typography
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import DenominationItem from './denomination-item';


export default function FamilleCard({ data, onChange, onDelete }) {
  const handleNameChange = (e) => {
    onChange({ ...data, name: e.target.value });
  };

  const handleAddDenomination = () => {
    const updated = {
      ...data,
      denominations: [...data.denominations || [], { id: Date.now(), label: '' }]
    };
    onChange(updated);
  };

  const handleUpdateDenomination = (i, newLabel) => {
    const updatedDenominations = [...data.denominations];
    updatedDenominations[i].label = newLabel;
    onChange({ ...data, denominations: updatedDenominations });
  };

  const handleRemoveDenomination = (i) => {
    const updatedDenominations = [...data.denominations];
    updatedDenominations.splice(i, 1);
    onChange({ ...data, denominations: updatedDenominations });
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          label="Nom de la Famille"
          value={data.name}
          onChange={handleNameChange}
          fullWidth
        />
        <IconButton color="error" onClick={onDelete}>
          <Iconify icon="tabler:trash" />
        </IconButton>
      </Stack>

      <Stack spacing={2} mt={2}>
        <Typography variant="subtitle2">Dénomination devant le nom du produit</Typography>
        {data.denominations?.map((item, index) => (
          <DenominationItem
            key={item.id}
            label={item.label}
            onChange={(val) => handleUpdateDenomination(index, val)}
            onDelete={() => handleRemoveDenomination(index)}
          />
        ))}
        <Button onClick={handleAddDenomination} variant="outlined">
          Ajouter une Dénomination
        </Button>
      </Stack>
    </Card>
  );
}
