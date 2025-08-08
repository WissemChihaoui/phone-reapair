import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'Le nom est requis!' }),
  email: zod
    .string()
    .min(1, { message: "L'email est requis!" })
    .email({ message: "L'email doit être une adresse email valide!" }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  fixNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  // state: zod.string().min(1, { message: 'L\'état est requis!' }),
  city: zod.string().min(1, { message: 'La ville est requise!' }),
  adress: zod.string().min(1, { message: "L'adresse est requise!" }),
  zipCode: zod.string().min(1, { message: 'Le code postal est requis!' }),
  company: zod.string().min(1, { message: 'La société est requise!' }),
  // role: zod.string().min(1, { message: 'Le rôle est requis!' }),
  // Not required
  // status: zod.string(),
});

export default function FournisseurAddEditForm({ currentFournisseur, open, onClose }) {
  console.log('Current :', currentFournisseur);

  const defaultValues = useMemo(
    () => ({
      name: currentFournisseur?.name || '',
      email: currentFournisseur?.email || '',
      phone: currentFournisseur?.phone || '',
      fixNumber: currentFournisseur?.fixNumber || '',
      adress: currentFournisseur?.adress || '',
      city: currentFournisseur?.city || '',
      zipCode: currentFournisseur?.zipCode || '',
      company: currentFournisseur?.company || '',
    }),
    [currentFournisseur]
  );

  console.log(defaultValues);

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
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
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentFournisseur ? 'Modifier ce' : 'Ajouter un'} fournisseur</DialogTitle>
        <DialogContent>
          <Box
            mt={2}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Field.Text name="name" label="Nom" />
            <Field.Text name="company" label="Société" />
            <Field.Text name="email" label="Email" />
            <Field.Phone name="phone" label="Téléphone" placeholder="Numéro du téléphone"/>
            <Field.Phone name="fixNumber" label="Numéro Fixe" placeholder="Numéro du téléphone fixe"/>
            <Field.Text name="adress" label="Adresse" />
            <Field.Text name="city" label="Ville" />
            <Field.Text name="zipCode" label="Code postal" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <LoadingButton color="primary" type="submit" variant="contained" loading={isSubmitting}>
            {currentFournisseur ? 'Modifier' : 'Ajouter'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
