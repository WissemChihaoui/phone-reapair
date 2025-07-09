import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, Stack, Button, Divider, Checkbox, MenuItem, FormControlLabel } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { today } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

const _methodes = ['Virement', 'Éspece'];
export default function PaymentFormView() {
  const { control } = useFormContext();

  const isEligible = useBoolean(false);

  const { fields, append, remove } = useFieldArray({ control, name: 'payment' });

  // Sample values
  const totaleHT = 1000; // Total HT
  const totaleRemiseEuros = 100; // Total Remise €

  // Calculate the percentage of total Remise (€) from total HT
  const totaleRemisePercent = ((totaleRemiseEuros / totaleHT) * 100).toFixed(2); // Two decimal places
  const handleAdd = () => {
    // eslint-disable-next-line no-constant-condition
    if (500 > 0) {
      append({
        id: fields.length,
        amount: null,
        date: today(),
        method: null,
      });
    }
  };
  const handleRemove = (index) => {
    console.log('About to remove i:', index);
    remove(index);
  };

  const handleCancel = () => {
    remove();
  };

  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-start' }}>
       
        <Box sx={{ p: 3, flex: 1 }}>
          <FormControlLabel
            control={
              <Checkbox size="small" checked={isEligible.value} onChange={isEligible.onToggle} />
            }
            label="Réparation éligible qualirepa"
          />
          {fields.map((item, index) => (
            <Box
              mb={1}
              display="flex"
              key={item.id}
              rowGap={3}
              alignItems="center"
              columnGap={2}
              width="100%"
            >
              {isEligible.value && (
                <Field.Select
                  fullWidth
                  name="payment_remboursement"
                  label="Paiement à remboursement"
                >
                  <MenuItem value="25">Paiement à remboursement 25</MenuItem>
                  <MenuItem value="50">Paiement à remboursement 50</MenuItem>
                </Field.Select>
              )}
              <Field.Text
                type="number"
                name={`payment[${index}].amount`}
                label={`Montant à payer ${index + 1}`}
              />
              <Field.Autocomplete
                fullWidth
                name={`payment[${index}].method`}
                label={`Méthode de paiement ${index + 1}`}
                options={_methodes.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <Field.DatePicker name={`payment[${index}].date`} label="Date" />
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              />
            </Box>
          ))}
          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
          <Stack
            spacing={3}
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-end', md: 'center' }}
          >
            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAdd}
              sx={{ flexShrink: 0 }}
            >
              Ajouter Méthode
            </Button>
          </Stack>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 4 }} />
         
        <Stack
          spacing={2}
          alignItems="flex-end"
          sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
        >
          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Total</Box>
            <Box sx={{ width: 160 ,typography: 'subtitle2' }}>{fCurrency(totaleHT)}</Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Remise (€)</Box>
            <Box sx={{ width: 160 ,color: 'error.main' }}>{`- ${fCurrency(totaleRemiseEuros)}`} ({`- ${totaleRemisePercent}%`})</Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Total aprés remise </Box>
            <Box sx={{ width: 160 ,color: 'error.main' }}>{`${fCurrency(totaleHT - totaleRemiseEuros) }`}</Box>
          </Stack>
          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Montant Payé</Box>
            <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(700) || '-'}</Box>
          </Stack>
          <Stack direction="row" sx={{ typography: 'subtitle1' }}>
            <div>Total Restant :</div>
            <Box sx={{ width: 160 }}>{fCurrency(200) || '-'}</Box>
          </Stack>
        </Stack>
      </Box>
  );
}
