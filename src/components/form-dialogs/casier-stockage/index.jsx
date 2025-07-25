import React from 'react';
import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

export const AddCasierSchema = zod.object({
  casier: zod.string().min(1, { message: 'Saisir le nom de casier' }),
});

export default function AddCasierStockage({ open, onClose }) {
  const defaultValues = {
    casier: '',
  };

  const methods = useForm({
    resolver: zodResolver(AddCasierSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      toast.success('Ajout de caisier avec succées');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors submission de formulaire');
    }
  });
  return (
    <Dialog open={open} onClose={onClose} >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Ajouter une casier de stockage</DialogTitle>

        <DialogContent>
          <Alert sx={{ mb: 2 }} severity="warning">
            Veuillez vérifier que le nom de caissier n&apos;existe pas
          </Alert>

          <Field.Text name="casier" autoFocus fullWidth type="text" variant="outlined" label="Nom du cassier" />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Annuler
          </Button>
          <LoadingButton loading={isSubmitting} type="submit" variant="contained">
            Ajouter
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
