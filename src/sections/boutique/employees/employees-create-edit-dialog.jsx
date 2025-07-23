import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import { toast } from 'src/components/snackbar';

import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { _roles } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'Le nom est requis !' }),
  email: zod
    .string()
    .min(1, { message: "L'e-mail est requis !" })
    .email({ message: "L'e-mail doit être une adresse e-mail valide !" }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  city: zod.string().min(1, { message: 'La ville est requise !' }),

  address: zod.string().min(1, { message: "L'adresse est requise !" }),
  zipCode: zod.string().min(1, { message: 'Le code postal est requis !' }),
  role: zod.string().min(1, { message: 'La fonction est requis !' }),
  password: zod
    .string()
    .min(1, { message: 'Le mot de passe est requis !' })
    .min(6, { message: 'Le mot de passe doit comporter au moins 6 caractères !' }),
  // Non requis
});

export default function EmployeesCreateEditDialog({ open, onClose, currentUser }) {
  const password = useBoolean();

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      password: currentUser?.password || '',
      role: currentUser?.role || '',
      zipCode: currentUser?.zipCode || '',
      city: currentUser?.city || '',
    }),
    [currentUser]
  );

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
        loading: 'Chargement...',
        success: 'Modification effectué!',
        error: 'Erreur lors de modification!',
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
        <DialogTitle>{currentUser ? 'Modifier' : 'Ajouter'}</DialogTitle>
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            mt={2}
          >
            <Field.Text name="name" label="Nom et prénom" />
            <Field.Select name="role" label="Fonction">
              {_roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Text name="email" label="Email" />
            <Field.Text
              name="password"
              label="Password"
              placeholder="6+ characters"
              type={password.value ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Field.Phone name="phoneNumber" label="Téléphone Mobile" />
            <Field.Text name="address" label="Adresse" />
            <Field.Text name="zipCode" label="Code postal" />
            <Field.Text name="city" label="City" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentUser ? 'Modifier' : 'Ajouter'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
