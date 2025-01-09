import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';

export default function FactureStepForm() {
  return (
    <>
      <Box
        columnGap={2}
        rowGap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        <Field.Text
          name="stepFour.amount"
          type="number"
          label="Montant"
          helperText="Montant T.T.C avant déduction du Bonus réparation"
        />
        <Field.RadioGroup
          row
          name="stepFour.bonus"
          label="Bonus réparation"
          helperText="NB : le bonus s'applique en déduction de votre montant TTC"
          options={[
            { label: fCurrency(25), value: 25 },
            { label: fCurrency(50), value: 50 },
          ]}
        />
        <Stack width="100%" mb={3}>
          <Typography>Facture</Typography>

          <Field.UploadBox
            name="stepFour.facture"
            sx={{ width: '100%', p: 2 }}
            placeholder={
              <Stack spacing={0.5} alignItems="center">
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Facture</Typography>
              </Stack>
            }
          />
        </Stack>
      </Box>
    </>
  );
}
