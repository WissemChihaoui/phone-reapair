import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, MenuItem, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

export const NewDepenseForm = zod.object({
  organisme: zod
    .string()
    .min(2, { message: 'Organisme doit contenir au moins 2 caractères' })
    .max(100, { message: 'Organisme ne doit pas dépasser 100 caractères' }),
  ht: zod.number().min(0, { message: 'Montant HT doit être positif' }),
  ttc: zod.number().min(0, { message: 'Montant TTC doit être positif' }),
  facture: zod
    .string()
    .min(2, { message: 'Numéro de Facture doit contenir au moins 2 caractères' })
    .max(100, { message: 'Numéro de Facture ne doit pas dépasser 100 caractères' }),
  date: zod.union([zod.string(), zod.number()]),
  fix: zod.boolean(),
});

export default function AchatsAddEditView({ currentDepense }) {
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      organisme: currentDepense?.organisme || '',
      ht: currentDepense?.ht || 0,
      ttc: currentDepense?.ttc || 0,
      facture: currentDepense?.facture || '',
      date: currentDepense?.date || null,
      fix: currentDepense?.fix || false,
    }),
    [currentDepense]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewDepenseForm),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentDepense ? 'Mis à jour avec succès!' : 'Créé avec succès!');
      router.push(paths.dashboard.achats.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Card>
      <CardHeader title={currentDepense ? 'Modifier la Dépense' : 'Ajouter une nouvelle Dépense'} />
      <Form methods={methods} onSubmit={onSubmit}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          mt={2}
          px={4}
        >
          <Field.Select name="organisme" label="Organisme">
            <MenuItem>Choisir un organisme</MenuItem>
            <MenuItem value="Organisme 1">Organisme 1</MenuItem>
            <MenuItem value="Organisme 2">Organisme 2</MenuItem>
          </Field.Select>
          <Field.Text name="ht" label="Montant HT" type="number" />
          <Field.Text name="ttc" label="Montant TTC" type="number" />
          <Field.Text name="facture" label="Numéro de Facture" />
          <Field.DatePicker name="date" label="Date de la dépense" />
          <Field.Checkbox name="fix" label="Charge Fixe" />
        </Box>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
          >
            {currentDepense ? 'Modifier' : 'Ajouter'}
          </LoadingButton>
        </Box>
      </Form>
    </Card>
  );
}
