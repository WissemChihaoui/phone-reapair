import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useMockedUser } from 'src/auth/hooks';
import { useCallback } from 'react';
import { Divider } from '@mui/material';

// ----------------------------------------------------------------------

export const UpdateUserSchema = zod.object({
  displayName: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  photoURL: schemaHelper.file({
    message: { required_error: 'Avatar is required!' },
  }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: schemaHelper.objectOrNull({
    message: { required_error: 'Country is required!' },
  }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  about: zod.string().min(1, { message: 'About is required!' }),
  // Not required
  isPublic: zod.boolean(),
});

// const TVA_LIST = [
    
// ]

export function GeneralFormView() {
  const { user } = useMockedUser();

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || null,
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
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

  const handleRemoveFile = useCallback(() => {
    setValue('photoURL', null);
  }, [setValue]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Field.Upload
              name="photoURL"
              onDelete={handleRemoveFile}
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Autorisé *.jpeg, *.jpg, *.png, *.gif
                  <br /> taille maximale de {fData(3145728)}
                </Typography>
              }
            />

            {/* <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            /> */}

            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Déconnexion
            </Button>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="displayName" label="Nom de la boutique" />
              <Field.Text name="email" label="Email de la boutique" />
              <Field.Phone name="phoneNumber" label="Téléphone" />
              <Field.Text name="address" label="Adresse" />
              <Field.Text name="city" label="Ville" />
              <Field.Text name="zipCode" label="Code Postal" />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="iban" label="IBAN/RIB" />
              <Field.Text name="capitalSocial" label="Capital Social" />
              <Field.Text name="siret" label="Siret" />
              <Field.Text name="rcs" label="Numéro RCS" />
              <Field.Text name="tva" label="Numéro TVA INTRA" />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card
           sx={{ p: 3 }}
          >
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Checkbox name="isSms" label='Notification SMS Global' />
              <Field.Checkbox name="isMail" label='Notification Email Global' />
              <Field.Text name="expediteur" label="Expéditeur SMS"/>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card
           sx={{ p: 3 }}
          >
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Checkbox name="statutEntrepneur" label='Statut Auto Entrepreneur' />
              <Field.Select name="tva" label="Taux TVA par défaut" >
                <></>
              </Field.Select>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
