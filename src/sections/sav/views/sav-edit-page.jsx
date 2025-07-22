import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Divider, MenuItem, TextField, Typography } from '@mui/material';

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

const _ETAT_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'en_attente', label: 'SAV en cours' },
  { value: 'en_cours', label: 'SAV cloturés' },
  { value: 'defectueux', label: 'Article défectueux' },
];

const TYPES = [
  { value: 1, label: 'Echange Standard et envoi vers le SAV' },
  { value: 2, label: 'Envoyez vers le SAV' },
];

export default function SavEditPage({ currentSav }) {
  const loadingSend = useBoolean();
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      id: currentSav?.id || null,
      createdAt: currentSav?.createdAt || today(),
      product: currentSav?.product || '',
      qte: currentSav?.qte || 0,
      imei: currentSav?.imei || '',
      type: currentSav?.type || '',
      comment: currentSav?.comment || '',
      status: currentSav?.status || 'en_attente',
      checked: currentSav?.checked || false,
    }),
    [currentSav]
  );
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewSavSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = handleSubmit(async (data) => {
    console.log(data);
    toast.success('SAV modifié avec succès !');
    router.push(paths.dashboard.sav.root);
  });
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier un SAV"
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
            <Stack justifyContent="space-between" direction="row" alignItems="center">
              <Stack spacing={1}>
                <Typography variant="h6">Client: {currentSav.client.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {currentSav.client.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Téléphone: {currentSav.client.phone}
                </Typography>
              </Stack>
              <Field.Select sx={{ maxWidth: 200 }} name="status" label="Statut">
                {_ETAT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Field.DatePicker
              name="createdAt"
              label="Date de création"
              inputFormat="dd/MM/yyyy"
              sx={{ maxWidth: 200 }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack spacing={3} direction="row">
             
              <Field.Checkbox name="checked" label={currentSav?.product} />
              <Field.Text sx={{ flex: 1 }} name="imei" label="IMEI" />
              <Field.Select sx={{ flex: 1 }} name="type" label="Type de produit">
                {TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
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
            Sauvgarder
          </LoadingButton>
        </Stack>
      </Form>
    </DashboardContent>
  );
}
