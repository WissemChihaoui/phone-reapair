import { z as zod } from 'zod';
import { React,useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Form, schemaHelper } from 'src/components/hook-form';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { today } from 'src/utils/format-time';
import PanierView from '../panier-view';
import ElementsView from '../elements-view';

export const NewInvoiceSchema = zod
    .object({
      client: schemaHelper.objectOrNull({
        message: { required_error: 'Choisir un client'}
      })
    })
export default function CaisseVirtuelleView() {
  const defaultValues = useMemo(
    ()=> ({
      id: '',
      client: {},
      items: [
        {
          name: 'produit tva non applicable',
          stock: 5,
          qte: 1,
          remise: 10,
          price: 20,
          total: 10,
        },
        {
          name: 'Article 1',
          stock: 5,
          qte: 1,
          remise: 10,
          price: 120,
          total: 110,
        },
      ],
      remiseTotale: 0,
      total: 0,
      subTotal: 0,
      date: today()
    }),[]
  )
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Caisse Virtuelle"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Ventes', href: paths.dashboard.vente.root },
            { name: 'Caisse Virtuelle'}
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Form methods={methods}>
          <Grid container spacing={4}>
            <Grid xs={12} >
              <Card>
                  <CardContent>
                      Client
                  </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} lg={6} >
              <Card>
                  <CardContent>
                      <PanierView />
                  </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} lg={6}>
              <Card>
                  <CardContent>
                    <ElementsView />
                  </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} >
              <Card>
                  <CardContent>
                      Total & paiment
                  </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </DashboardContent>
    </>
  );
}
