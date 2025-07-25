import React from 'react';
import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Field, Form } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';

export const CategoriesSchema = zod.object({
  category: zod.string().min(1, { message: 'Remplir Champs Catégorie!' }),
});

export default function AddCategories({ open, onClose }) {
  const defaultValues = {
    category: '',
  };

  const methods = useForm({
    resolver: zodResolver(CategoriesSchema),
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
    <Dialog open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Ajouter Catégorie</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Ajouter une catégorie maintenant, ajouter une sous-catégorie plus tard
          </Typography>
          <Field.Text name="category" autoFocus fullWidth type="text" variant="outlined" label="Nom du catégorie" />
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
