import { Box, Divider, MenuItem, Stack } from '@mui/material'
import React from 'react'
import { Field } from 'src/components/hook-form'

export default function ClientStepForm() {
  return (
    <>
        <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        >
            <Field.Select name="stepThree.civilite" label="Civilité">
              <MenuItem value="">Civilité</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {['Mme','M', 'Autre'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text name="stepThree.firstName" label="Nom du client"/>
            <Field.Text name="stepThree.lastName" label="Prénom du client"/>
            <Field.Text name="stepThree.email" label="Email"/>
            <Field.Phone name="stepThree.phone" label="Numéro du téléphone"/>
            <Field.Text name="stepThree.adresse" label="Adresse"/>
            <Field.Text name="stepThree.ville" label="Ville"/>
            <Field.Text name="stepThree.zipCode" label="Code Postal"/>
        </Box>
        </Stack>
    </>
  )
}
