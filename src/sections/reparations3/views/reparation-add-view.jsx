import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Button, Divider } from '@mui/material';

import { paths } from 'src/routes/paths';

import { today } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ClientFormView from '../client-form-view';
import ArticleFormView from '../article-form-view';
import PaymentFormView from '../payment-form-view';
import DocumentFormView from '../document-form-view';
import NotificationsFormView from '../notifications-form-view';

export default function ReparationAddView() {
  const defaultValues = useMemo(
    () => ({
      id: '',
      client: {
        id: '',
        name: '',
        fullAddress: '',
        phoneNumber: '',
        email: '',
        company: '',
      },
      article: {
        materiel: { value: '', label: 'Choisir ...' },
        marque: { value: '', label: 'Choisir ...' },
        modele: { value: '', label: 'Choisir ...' },
        imei: '',
        accessoire: [],
        etat: '',
        rapport: {
          items: {},
          observation: '',
        },
        noteClient: '',
        noteIntervention: '',
        noteInterne: '',
        schemaVer: [],
        dateRestitution: null,
        technicien: '',
      },
      documents: [],
      payment: {
        quali: true,
        data: [
          {
            amount: 0,
            methode: { value: '', label: 'Choisir ...' },
            date: today(),
          },
        ],
      },
      total: 0,
      remise: 0,
      paid: 0,
      rest: 0,
      notification: {
        email: false,
        sms: false,
        materiel: false,
        materielTitle: '',
        etat: '',
        delai: '',
        casier: '',
        devis: '',
      },
    }),
    []
  );

  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Form data:', data);
      toast.success('Création réussie');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Erreur lors de l'envoi du formulaire");
    }
  });

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Créer une nouvelle réparation"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Réparation', href: paths.dashboard.reparations.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3 }}>
          <ClientFormView />
          <Divider sx={{ my: 3 }} />
          <ArticleFormView />
          <Divider sx={{ my: 3 }} />
          <DocumentFormView />
          <Divider sx={{ my: 3 }} />
          <NotificationsFormView />
          <Divider sx={{ my: 3 }} />
          <PaymentFormView />
        </Card>

        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" size="large" onClick={handleReset}>
            Réinitialiser
          </Button>

          <LoadingButton
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            loading={isSubmitting}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Form>
    </DashboardContent>
  );
}
