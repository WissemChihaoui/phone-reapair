import { Stack, Typography } from '@mui/material';
import React from 'react';
import { Field } from 'src/components/hook-form';

export default function ReparationStepForm() {
  return (
    <Stack display="flex" gap={3}>
      <Field.DatePicker name="stepOne.date" label="Date de la réparation" />
      <Field.Text name="stepOne.refe" label="Votre référence de réparation" />
      <Stack>
        <Field.RadioGroup
          row
          name="stepOne.type"
          label="Type d'intervention"
          options={[
            { label: 'À domicile', value: 'domicile' },
            { label: 'En atelier', value: 'atelier' },
          ]}
        />
      </Stack>
    </Stack>
  );
}
