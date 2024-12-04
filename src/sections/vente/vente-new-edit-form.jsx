import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { today, fIsAfter } from 'src/utils/format-time';

import { _addressBooks } from 'src/_mock';

import { Form, schemaHelper } from 'src/components/hook-form';
import { VenteNewEditDetails } from './vente-new-edit-details';
import { VenteNewEditAddress } from './vente-new-edit-address';
import { VenteNewEditStatusDate } from './vente-new-edit-status';
import VenteNewEditCheckout from './vente-new-edit-checkout';

// import { InvoiceNewEditDetails } from './invoice-new-edit-details';
// import { InvoiceNewEditAddress } from './invoice-new-edit-address';
// import { InvoiceNewEditStatusDate } from './invoice-new-edit-status-date';

// ----------------------------------------------------------------------

export const NewInvoiceSchema = zod
  .object({
    invoiceTo: schemaHelper.objectOrNull({
      message: { required_error: 'Invoice to is required!' },
    }),
    createDate: schemaHelper.date({
      message: { required_error: 'Create date is required!' },
    }),
    dueDate: schemaHelper.date({
      message: { required_error: 'Due date is required!' },
    }),
    items: zod.array(
      zod.object({
        title: zod.string().min(1, { message: 'Title is required!' }),
        service: zod.string().min(1, { message: 'Service is required!' }),
        quantity: zod.number().min(1, { message: 'Quantity must be more than 0' }),
        // Not required
        price: zod.number(),
        total: zod.number(),
        description: zod.string(),
      })
    ),
    // Not required
    taxes: zod.number(),
    status: zod.string(),
    discount: zod.number(),
    shipping: zod.number(),
    totalAmount: zod.number(),
    invoiceNumber: zod.string(),
    invoiceFrom: zod.custom().nullable(),
  })
  .refine((data) => !fIsAfter(data.createDate, data.dueDate), {
    message: 'Due date cannot be earlier than create date!',
    path: ['dueDate'],
  });

// ----------------------------------------------------------------------

export function VenteNewEditForm({ currentInvoice }) {
  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const checkout = useBoolean()

  const defaultValues = useMemo(
    
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || 'INV-1990', // vente Id
      createDate: currentInvoice?.createDate || today(), // date
      status: currentInvoice?.status || '', // statut
      type: currentInvoice?.type || 'Vente', // statut
      discount: currentInvoice?.discount || 0, // Remise Total
      invoiceFrom: currentInvoice?.invoiceFrom || null, // Client
      totalAmount: currentInvoice?.totalAmount || 0, // total TTC
      note: currentInvoice?.note || '', // Note
      totalHt: currentInvoice?.totalHT || 0, // total HT
      total : currentInvoice?.total || 0,
      signature : currentInvoice?.signature || null,
      payement : currentInvoice?.payement || [
        {
          id:0,
          amount: null,
          date: today(),
          via : null
        },
      ],
      items: currentInvoice?.items || [
        {
          articleId: '',
          articleName: '',
          description: '',
          quantity: 1,
          price: 0,
          remise: 0,
          total: 0,
          tva: 0,
        },
      ],
    }),
    [currentInvoice]
  );

  const methods = useForm({
    mode: 'all',
    // resolver: zodResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();
    console.log(data);
    

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   loadingSave.onFalse();
    //   router.push(paths.dashboard.invoice.root);
    //   console.info('DATA', JSON.stringify(data, null, 2));
    // } catch (error) {
    //   console.error(error);
    //   loadingSave.onFalse();
    // }
  });

  const handleCreateAndSend = handleSubmit(async (data) => {
    loadingSend.onTrue();
    checkout.onTrue();
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   loadingSend.onFalse();
    //   router.push(paths.dashboard.invoice.root);
    //   console.info('DATA', JSON.stringify(data, null, 2));
    // } catch (error) {
    //   console.error(error);
    //   loadingSend.onFalse();
    // }
  });

  return (
    <Form methods={methods}>
      <Card>
        <VenteNewEditAddress />
        <VenteNewEditStatusDate />
        <VenteNewEditDetails />
        <VenteNewEditCheckout open={checkout.value} onClose={checkout.onFalse}/>
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          {currentInvoice ? 'Modifier' : 'Enregistrer'}
        </LoadingButton>

          {methods.watch('type') === 'Vente' ?         
          <LoadingButton
          size="large"
          variant="contained"
          color='primary'
          loading={loadingSend.value && isSubmitting}
          onClick={()=>handleCreateAndSend()}
        >
          {currentInvoice ? 'Modifier' : 'Enregistrer'} & Payer
        </LoadingButton> : ''}
          
      </Stack>
    </Form>
  );
}
