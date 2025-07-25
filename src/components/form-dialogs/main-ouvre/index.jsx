import React from 'react';
import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

export const MainSchema = zod.object({
  name: zod.string().min(1, { message: 'Nom est requis' }),
  price: zod.number().min(1, { message: 'Prix est requis' }),
});

export default function AddMainOuvreDialog({ open, onClose }) {
  const defaultValues = {
    name: '',
    price: 0,
  };
  const methods = useForm({
    resolver: zodResolver(MainSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'En cours...',
        success: 'Ajout avec succés!',
        error: 'Ajout erroné!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Ajouter un main d&apos;oeuvre</DialogTitle>
        <DialogContent>
          <Stack p={2} spacing={1}>
              <Field.Text name="name" label="Main d'oeuvre" />
              <Field.Text type="number" name="price" label="Prix" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Annuler
          </Button>
          <LoadingButton
            loading={isSubmitting}
            loadingIndicator="Envoie du réquête..."
            type="submit"
            color="primary"
            variant="contained"
          >
            Ajouter
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
