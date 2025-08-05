import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, Stack, Button, Divider } from '@mui/material';

import { today } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

const _baseMethodes = [
  { value: '', label: 'Choisir ...' },
  { value: 'virement', label: 'Virement' },
  { value: 'espece', label: 'Éspece' },
]
const _remboursementMethodes = [
  { value: 'remboursement_25', label: 'Paiement à remboursement 25' },
  { value: 'remboursement_50', label: 'Paiement à remboursement 50' },
];
export default function PaymentFormView() {
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'payment.data' });

  const {payment} = watch()

  const getPaymentOptions = () => {
    let options = _baseMethodes;
    if (payment.quali) {
      options = [...options, ..._remboursementMethodes];
    }
    return options;
  };

  const handleAdd = () => {
    const newLocal = 500 > 0;
    if (newLocal) {
      append({
        id: fields.length,
        amount: null,
        date: today(),
        methode: { value: '', label: 'Choisir ...' },
      });
    }
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'flex-start' }}>
      <Box sx={{ p: 3, flex: 1 }}>
       
        <Stack sx={{ mb: 2}}>
          <Field.Checkbox name="payment.quali" label="Réparation éligible qualirepar" />
        </Stack>
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
            <Field.Text
              type="number"
              name={`payment.data[${index}].amount`}
              label={`Montant à payer ${index + 1}`}
            />
            <Field.Autocomplete
              fullWidth
              name={`payment.data[${index}].methode`}
              label={`Méthode de paiement ${index + 1}`}
              options={getPaymentOptions()}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
            />
            <Field.DatePicker name={`payment.data[${index}].date`} label="Date" />
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
          <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(600)}</Box>
        </Stack>

        <Stack direction="row">
          <Box sx={{ color: 'text.secondary' }}>Remise (€)</Box>
          <Box sx={{ width: 160, color: 'error.main' }}>
            {`- ${fCurrency(1200)}`} ({`- ${1200}%`})
          </Box>
        </Stack>

        <Stack direction="row">
          <Box sx={{ color: 'text.secondary' }}>Total aprés remise </Box>
          <Box
            sx={{ width: 160, color: 'error.main' }}
          >{`${fCurrency(500 - 100)}`}</Box>
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
