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
    id: '', // remains empty as in data
    client: {
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      name: "Jayvion Simon",
      fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
      phoneNumber: "+1 202-555-0143",
      email: "ashlynn.ohara62@gmail.com",
      company: "Gleichner, Mueller and Tromp"
    },
    articles: [
      {
        // type: { value: "tablet", label: "Tablet" },
        // marque: { value: "samsung", label: "Samsung" },
        // modele: { value: "iphone13", label: "iPhone 13" },
        serie: "azeazeaze",
        // etat: { value: "new", label: "Comme neuf" },
        accessoire: "azeaze",
        rapport: {
          items: [], // from data rapport.items
          observation: "", // from data rapport.observation
        },
        noteClient: "aze",
        noteIntervention: "aze",
        noteInterne: "aze",
        schemaVer: [6, 4, 2, 5, 8],
        dateRestitution: "2025-07-11T00:00:00+01:00",
        technicien: { value: "tech2", label: "Marie Martin" },
        // documents: [
        //   {
        //     id: "",
        //     type: "",
        //     data: {},
        //   },
        //   {
        //     id: "cedb3c47-37a1-4119-9bb9-9fcc597d7d77",
        //     type: "piece",
        //     data: {
        //       nom: "aaa",
        //       price: "50",
        //       qte: "10",
        //       remise: "20",
        //       total: "480.00",
        //     },
        //   },
        // ],
        total: 490,
      }
    ],
    payement: {
      quali: false, // from data
      data: [
        {
          remboursement: "",
          amount: 50,
          methode: { value: "Éspece", label: "Éspece" },
          date: "2025-07-22T00:00:00+01:00",
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


export default function EditReparationView() {
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
        heading="Modifier réparation"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Réparation', href: paths.dashboard.vente.root },
          { name: 'Modifier' },
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