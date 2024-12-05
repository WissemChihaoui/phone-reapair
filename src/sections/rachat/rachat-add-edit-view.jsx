import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { Form } from 'src/components/hook-form'
import { today } from 'src/utils/format-time';
import { Card } from '@mui/material';
import {RachatAddEditClient} from './rachat-add-edit-client';

export default function RachatAddEditView({ currentInvoice }) {

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

  return (
    <Form methods={methods}>
        <Card>
            <RachatAddEditClient />
        </Card>
    </Form>
  )
}
