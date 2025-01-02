import { LoadingButton } from '@mui/lab';
import { Card, Divider, Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'src/components/hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import ClientFormView from '../forms/client-form-view';
import ArticleFormView from '../forms/article-form-view';

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
              ttc: null,
            },
          ],
          oeuvre: [
            {
              nom: '',
              price: null,
              champ: '',
            },
          ],
          type: '',
          marque: '',
          model: '',
          serie: '',
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
        {
          piece: [
            {
              nom: '',
              qte: null,
              price: null,
              champ: '',
              ttc: null,
            },
          ],
          oeuvre: [
            {
              nom: '',
              price: null,
              champ: '',
            },
          ],
          type: '',
          marque: '',
          model: '',
          serie: '',
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
  })
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
