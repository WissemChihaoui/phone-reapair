import { LoadingButton } from '@mui/lab';
import { Card } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, Form } from 'src/components/hook-form'

export default function QrcodeFormView() {
    const defaultValues = {qrCodeLink:'', qrCodeDescription:''};
    const methods = useForm({
        mode: 'all',
        // resolver: zodResolver(ChangePassWordSchema),
        defaultValues,
      });
      const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const onSubmit = handleSubmit(async (data) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          reset();
          toast.success('Update success!');
          console.info('DATA', data);
        } catch (error) {
          console.error(error);
        }
      });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
            <Field.Text name="qrCodeLink" label="Qr Code Lien" />
            <Field.Text name="qrCodeDescription" label="Qr Code Description" multiline rows={5}/>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
        Enregistrer
        </LoadingButton>
        </Card>
    </Form>
  )
}
