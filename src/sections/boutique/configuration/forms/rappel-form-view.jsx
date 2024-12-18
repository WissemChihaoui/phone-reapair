import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, Form } from 'src/components/hook-form';

export default function RappelFormView() {
  const defaultValues = {};
  const methods = useForm({
    mode: 'all',
    // resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Field.Checkbox name="sendAvisMail" label="Demande d'avis" />
        <Divider sx={{ my: 4 }} />
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <Field.Text type="number" name="sendEven" label="Délai de jour" />
          <Field.Text name="avisMailObject" label="Objet Mail" />
        </Box>
        <Box my={2}>
          <Field.Text name="courriel" label="Courriel" />
        </Box>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Enregistrer
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
