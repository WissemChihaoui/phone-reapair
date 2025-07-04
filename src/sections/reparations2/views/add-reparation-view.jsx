import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Divider } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ClientFormView from '../forms/client-form-view';
import ArticleFormView from '../forms/article-form-view';
import PaymentFormView from '../forms/payment-form-view';

export default function AddReparationView() {
  const loadingSave = useBoolean();
  const defaultValues = useMemo(
    () => ({
      id: null,
      client: {},
      products: [
        {
          piece: [],
          oeuvre: [],
          service: [],
          regroupements: [],
          totalPiece: null,
          totalOeuvre: null,
          totalService: null,
          totalHT: null,
          totalRemise: null,
          type: '',
          marque: '',
          modele: '',
          serie: '0011',
          rapport: {
            observation: '',
            items: [],
          },
          etat: '',
          accessoire: '',
          noteClient: '',
          noteIntervention: '',
          schemaVer: '',
          noteInterne: '',
          dateRestitution: null,
          technicien: '',
          dynamicContent: [], // Holds F1/F2/F3/F4 blocks dynamically
        },
      ],
      totalHT: null,
      totalRemise: null,
      totalTTC: null,
      payment: [
        {
          method: null,
          amount: null,
        },
      ],
      paid: null,
      settings: {
        notifications: null,
        etat: null,
        casier: null,
        isMateriel: false,
        materiel: null,
        delai: null,
        validity: null,
      },
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const save = handleSubmit(async (data) => {
    loadingSave.onTrue();
    console.log(data);
  });

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
      <Form methods={methods}>
        <Card>
          <ClientFormView />
          <Divider />
          <ArticleFormView />
          <Divider />
          <PaymentFormView />
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            color="inherit"
            size="large"
            variant="outlined"
            loading={loadingSave.value && isSubmitting}
            onClick={save}
          >
            Enregistrer
          </LoadingButton>
        </Stack>
      </Form>
    </DashboardContent>
  );
}
