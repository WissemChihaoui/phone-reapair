import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Divider, TextField } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { today } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const NewSavSchema = zod.object({
  id: zod.number().nullable(),
  createdAt: zod.union([zod.string(), zod.number()]),
  product: zod.string().min(1, 'Produit est requis'),
  qte: zod.number().min(1, 'Quantité doit être supérieure à 0'),
  imei: zod.string().optional(),
  comment: zod.string().optional(),
});

export default function SavAddPage() {
  const loadingSend = useBoolean();
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      id: null,
      createdAt: today(),
      product: '',
      qte: 0,
      imei: '',
      comment: '',
    }),
    []
  );
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewSavSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (data) => {
    console.log(data);
    toast.success('SAV ajouté avec succès !');
    router.push(paths.dashboard.sav.root);
  });
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter un SAV"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'SAV', href: paths.dashboard.sav.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={handleSubmit}>
        <Card>
          <Stack p={3} spacing={3}>
            <Field.DatePicker
              name="createdAt"
              label="Date de création"
              inputFormat="dd/MM/yyyy"
              sx={{ maxWidth: 200 }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack spacing={3} direction="row">
              <Field.Autocomplete
                name="product"
                sx={{ flex: 1 }}
                label="Produit"
                options={['Produit 1', 'Produit 2', 'Produit 3']}
                renderInput={(params) => <TextField label="Produit" {...params} />}
              />
              <Field.Text sx={{ flex: 1 }} type="number" name="qte" label="Quantité" />
              <Field.Text sx={{ flex: 1 }} name="imei" label="IMEI" />
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Field.Text name="comment" label="Commentaire" multiline rows={4} />
          </Stack>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            size="large"
            variant="contained"
            color="primary"
            loading={loadingSend.value && isSubmitting}
            onClick={() => handleCreateAndSend()}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Form>
    </DashboardContent>
  );
}
