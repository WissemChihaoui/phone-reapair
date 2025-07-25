
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

import { Form } from 'src/components/hook-form';

export const CategoriesSchema = zod.object({
  category: zod.string().min(1, { message: 'Remplir Champs Sous-Catégorie!' }),
});

export default function AddSousCategories({ open, onClose, category }) {
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
        loading: 'Loading...',
        success: 'Update success!',
        error: 'Update error!',
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
        <DialogTitle>Ajouter Sous-Catégorie</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Ajouter une sous-catégorie pour {category}
          </Typography>
          <TextField autoFocus fullWidth type="text" variant="outlined" label="Nom du catégorie" />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
          >
            Annuler
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
