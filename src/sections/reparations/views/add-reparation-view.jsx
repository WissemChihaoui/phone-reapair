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
          piece: [
            {
              nom: '',
              qte: null,
              price: null,
              champ: '',
              remise: null,
              totalHT: null /* price x qte */,
            },
          ],
          oeuvre: [
            {
              nom: '',
              price: null,
              champ: '',
            },
          ],
          totalPiece: null /* SUM(piece.totalHT) */,
          totalOeuvre: null /* SUM(oeuvre.price) */,
          totalHT: null /* totalPiece + totalOeuvre */,
          totalRemise: null /* SUM(piece.remise) */,
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
        },
      ],
      totalHT: null /* SUM(products.totalHT) */,
      totalRemise: null /* SUM(products.totalRemise) */,
      totalTTC: null /* this.totalHT - this.totalRemise */,
      payment: [
        {
          method: null,
          amount: null,
        },
      ],
      paid: null /* SUM(payment.amount) */,
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
