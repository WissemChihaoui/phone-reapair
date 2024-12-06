import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { Form } from 'src/components/hook-form'
import { today } from 'src/utils/format-time';
import { Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useBoolean } from 'src/hooks/use-boolean';
import {RachatAddEditClient} from './rachat-add-edit-client';
import RachatAddEditDetails from './rachat-add-edit-details';
import RachatAddEditPayment from './rachat-add-edit-payment';

export default function RachatAddEditView({ currentInvoice }) {

    const defaultValues = useMemo(
    
        () => ({
          id: currentInvoice?.id || null,
          client: currentInvoice?.client || null,
          product: currentInvoice?.product || {name: '', accessoire: '', etat: '', serie:''},
          amount: currentInvoice?.amount || 0,
          payementMethode : currentInvoice?.payementMethode || null,
          imageCni : '',
          imageFacture: '',
          cni: ''
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

      const loadingSend = useBoolean();

      const handleCreateAndSend = handleSubmit(async (data) => {
        console.log(data);
      });

  return (
    <Form methods={methods}>
        <Card>
            <RachatAddEditClient />
            <RachatAddEditDetails />
            <RachatAddEditPayment />
        </Card>

        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>  
          <LoadingButton
          size="large"
          variant="contained"
          color='primary'
          loading={loadingSend.value && isSubmitting}
          onClick={()=>handleCreateAndSend()}
        >
          {currentInvoice ? 'Modifier' : 'Enregistrer'}
        </LoadingButton>
          
      </Stack>
    </Form>
  )
}
