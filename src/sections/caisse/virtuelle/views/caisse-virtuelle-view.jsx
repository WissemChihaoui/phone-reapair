import { z as zod } from 'zod';
import { React,useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Card, CardContent, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Form, schemaHelper } from 'src/components/hook-form';
import { DashboardContent } from 'src/layouts/dashboard';
import { LoadingButton } from '@mui/lab';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { today } from 'src/utils/format-time';
import PanierView from '../panier-view';
import ElementsView from '../elements-view';
import CartView from '../cart-view';
import ClientCart from '../client-cart';
import TotalView from '../total-view';
import PaymentModal from '../payment-modal';

export const NewInvoiceSchema = zod
    .object({
      client: schemaHelper.objectOrNull({
        message: { required_error: 'Choisir un client'}
      })
    })
export default function CaisseVirtuelleView() {
  const loadingSend = useBoolean();
  const checkout = useBoolean();
  const defaultValues = useMemo(
    ()=> ({
      id: '',
      client: {},
      items: [
        
      ],
      payement :[
        {
          id:0,
          amount: null,
          date: today(),
          via : null
        },
      ],
      quantities:0,
      remiseTotale: 0,
      total: 0,
      subTotal: 0,
      rest: 0,
      paid: 0,
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

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();
    checkout.onTrue();
  });
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
        <PaymentModal open={checkout.value} onClose={checkout.onFalse} handleSubmit={handleSubmit}/>
          <Grid container spacing={4}>
            <Grid xs={12} >
              <Card>
                  <CardContent>
                      <ClientCart />
                  </CardContent>
              </Card>
            </Grid>
            <Grid container xs={12}>
              <CartView />
            </Grid>
            
          </Grid>
          <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
          size="large"
          variant="contained"
          color='primary'
          loading={loadingSend.value && isSubmitting}
          onClick={()=>handleCreateAndSend()}
        >
          Enregistrer & Payer
        </LoadingButton>
          </Stack>
        </Form>
      </DashboardContent>
    </>
  );
}
