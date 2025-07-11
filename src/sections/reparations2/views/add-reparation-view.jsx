import React, { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Button, Divider } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ClientFormView from '../forms/client-form-view';
import ArticleFormView from '../forms/article-form-view';
import PaymentFormView from '../forms/payment-form-view';
import NotificationsSettingsModal from '../notifications-settings-modal';

const useRepairFormDefaultValues = () => 
  useMemo(() => ({
    id: '',
    client: {
      id: '',
      name: '',
      fullAddress: '',
      phoneNumber: '',
      email: '',
      company: ''
    },
    articles: [
      {
        type: "",
        marque: "",
        modele: "",
        serie: "",
        etat: "",
        accessoire: "",
        rapport: {
          items: [],
          observation: "",
        },
        noteClient: "",
        noteIntervention: "",
        noteInterne: "",
        schemaVer: [],
        dateRestitution: null,
        technicien: "",
        documents: [
          {
            id: "",
            type: "",
            data: {},
          },
        ],
        total: 0,
      }
    ],
    payement: {
      quali: false,
      data: [
        {
          remboursement: "",
          amount: 0,
          methode: "",
          date: null,
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
      materielTitle: "",
      etat: "",
      delai: "",
      casier: "",
      devis: "",
    },
  }), []);

export default function AddReparationView() {
  const loadingSave = useBoolean();
  const openSettings = useBoolean();
  const defaultValues = useRepairFormDefaultValues();

  const methods = useForm({
    mode: 'onBlur',
    defaultValues
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    loadingSave.onTrue();
    try {
      console.log('Form data:', data);
      // Add your submission logic here
      // Example API call:
      // await api.createRepair(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      loadingSave.onFalse();
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
          { name: 'Réparation', href: paths.dashboard.vente.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Card sx={{ p: 3 }}>
            <ClientFormView />
            <Divider sx={{ my: 3 }} />
            <ArticleFormView />
            <Divider sx={{ my: 3 }} />
            <PaymentFormView />
          </Card>

          <Stack 
            justifyContent="flex-end" 
            direction="row" 
            spacing={2} 
            sx={{ mt: 3 }}
          >
            <Button 
              variant="outlined" 
              size="large"
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
            
            <Button 
              variant="contained" 
              size="large" 
              onClick={openSettings.onTrue}
            >
              Paramètres des notifications
            </Button>
            
            <LoadingButton
              type="submit"
              color="primary"
              size="large"
              variant="contained"
              loading={loadingSave.value && isSubmitting}
            >
              Enregistrer
            </LoadingButton>
          </Stack>
        </form>

        <NotificationsSettingsModal 
          open={openSettings.value} 
          onClose={openSettings.onFalse} 
        />
      </FormProvider>
    </DashboardContent>
  );
}