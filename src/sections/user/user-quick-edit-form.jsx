import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { _clientIndvTypes, _clientTypes } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: schemaHelper.objectOrNull({
    message: { required_error: 'Country is required!' },
  }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  role: zod.string().min(1, { message: 'Role is required!' }),
  // Not required
  status: zod.string(),
});

// ----------------------------------------------------------------------


export function UserQuickEditForm({ currentUser, open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      type: currentUser?.type || '',
      state: currentUser?.state || '',
      address: currentUser?.address || '',
      zipCode: currentUser?.zipCode || '',
      raison: currentUser?.raison || '',
      siret: currentUser?.siret || '',
      tva: currentUser?.tva || '',
      isTvaUnion: currentUser?.isTvaUnion || '',
      indvType: currentUser?.indvType || ''
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
    watch,
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
        <DialogTitle>Modifier le client</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            mt={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Box sx={{ width: '100%'}}>
              <Field.Select name="type" label="Type de compte">
                {_clientTypes.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Field.Select>
            </Box>

            <Field.Text name="name" label={watch('type') === 'Particulier' ? 'Nom et prénom' : 'Nom du gérant'} />
            <Field.Text name="email" label="Email address" />
            <Field.Phone name="phoneNumber" label="Phone number" />

            <Field.Text name="state" label="State/region" />
            <Field.Text name="address" label="Address" />
            <Field.Text name="zipCode" label="Zip/code" />
            {
              watch('type') === 'Entreprise'?
              <>
                <Field.Text name="raison" label="Raison social"/>
                <Field.Text name="siret" label="SIRET"/>
                <Field.Text name="tva" label="TVA"/>
              </>:
              <Box sx={{ width: '100%'}}>
              <Field.Select name="indvType" label="Type de compte individuel">
                {_clientIndvTypes.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Field.Select>
            </Box>
            }
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Mettre à jour
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
