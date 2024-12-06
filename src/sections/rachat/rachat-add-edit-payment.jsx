import { Box, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/hook-form'

const _METHODS = [
    { value: 0, label: 'Virement' },
    { value: 1, label: 'Espèces' },
    { value: 2, label: 'Chèque' },
    { value: 3, label: 'Carte bancaire' },
    { value: 4, label: 'PayPal' },
    { value: 5, label: 'Cryptomonnaie' },
    { value: 6, label: 'Paiement mobile' },
];


export default function RachatAddEditPayment() {

    const {
        watch,
        setValue,
        control,
        formState: { errors },
      } = useFormContext();
    
      const values = watch()

  return (
    <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Payement:
        </Typography>
        <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Field.Text size='small' type="number" name='amount' label='Montant de rachat' />
            <Field.Select size='small' name='payementMethode' label='Méthode'>
                {_METHODS.map((row) => (
                    <MenuItem key={row.value} value={row.value}>
                        {row.label}
                    </MenuItem>
                ))}
            </Field.Select>
        </Stack>
    </Box>
  )
}
