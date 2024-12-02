import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { Field, Form, schemaHelper } from 'src/components/hook-form'
import { toast } from 'sonner';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const UserQuickEditSchema = zod.object({
    name: zod.string().min(1, { message: 'Name is required!' }),
    email: zod
      .string()
      .min(1, { message: 'Email is required!' })
      .email({ message: 'Email must be a valid email address!' }),
    phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
    fixNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
    // state: zod.string().min(1, { message: 'State is required!' }),
    city: zod.string().min(1, { message: 'City is required!' }),
    address: zod.string().min(1, { message: 'Address is required!' }),
    zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
    company: zod.string().min(1, { message: 'Company is required!' }),
    // role: zod.string().min(1, { message: 'Role is required!' }),
    // Not required
    // status: zod.string(),
  });

export default function FournisseurAddEditForm({ currentFournisseur, open, onClose }) {


    console.log('Current :',currentFournisseur);
    
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
            <DialogTitle>{currentFournisseur ? "Modifier" : "Ajouter" } Fournisseur</DialogTitle>
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
                    <Field.Phone name="phone" label="Téléphone" />
                    <Field.Phone name="fixNumber" label="Numéro Fixe" />
                    <Field.Text name="adress" label="Adresse" />
                    <Field.Text name="city" label="Ville" />
                    <Field.Text name="zipCode" label="Code Postale" />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Annuler
                </Button>
                <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                    {currentFournisseur ? 'Modifier' : 'Ajouter'}
                </LoadingButton>
            </DialogActions>
        </Form>
    </Dialog>
  )
}