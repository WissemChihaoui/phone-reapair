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
import { Divider, InputAdornment, MenuItem } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

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

const TVA_LIST = [
  { value: '20', label: '20%' },
  { value: '10', label: '10%' },
  { value: '5', label: '5%' },
  { value: '2', label: '2%' },
];
const DEVIS_LIST = [
  { value: '€', label: 'EURO €' },
  { value: '$', label: 'USD $' },
];

const CGVON = [
  { label: 'Facture', value: 'Facture' },
  { label: 'Devis', value: 'Devis' },
  { label: 'Bon de commande', value: 'Bon de commande' },
  { label: 'Reçu', value: 'Reçu' },
];

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
    cgvOn: user?.cgvOn || [],
    color: user?.color || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const colorWatch = watch('color')  

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

<Field.Text 
                                name='color' 
                                label='Couleur' 
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Label style={{ background: colorWatch}}/>
                                      </InputAdornment>
                                    ),
                                  }}
                                />   

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
              <Field.Select name="formJuridique" label="Forme juridique">
                <MenuItem value="1">Entreprise individuelle(EI)</MenuItem>
                <MenuItem value="2">Entreprise unipersonnelle à responsabilité limitée (SARL unipersonnelle)(EURL)</MenuItem>
                <MenuItem value="3">Société à responsabilité limitée(SARL)</MenuItem>
                <MenuItem value="4">Société anonyme(SA)</MenuItem>
                <MenuItem value="5">Société par actions simplifiée(SAS)</MenuItem>
                <MenuItem value="6">Société par actions simplifiée unipersonnelle(SASU)</MenuItem>
              </Field.Select>
              <Field.Switch name="caisse" label="Utilisation Caisse" />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Checkbox name="isSms" label="Notification SMS Global" />
              <Field.Checkbox name="isMail" label="Notification Email Global" />
              <Field.Text name="expediteur" label="Expéditeur SMS" />
            </Box>
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
              }}
            >
              <Field.Checkbox name="statutEntrepneur" label="Statut Auto Entrepreneur" />
              <Field.Select name="tvaValue" label="Taux TVA par défaut">
                {TVA_LIST.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="devise" label="Devise">
                {DEVIS_LIST.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card sx={{ p: 3,  height: '100%' }}>
            <Grid container spacing={2}>
                <Field.UploadBox name="cgvFile" label="CGV PDF" 
                  placeholder={
                    <Stack spacing={0.5} alignItems="center">
                      <Iconify icon="eva:cloud-upload-fill" width={40} />
                      <Typography variant="body2">CGV PDF</Typography>
                    </Stack>
                  }
                  sx={{ mb: 3, py: 2.5, flexGrow: 1, height: 'auto' }}
                />
                <Field.MultiCheckbox row name="cgvOn" sx={{ gap: 2 }} options={CGVON} />
            </Grid>
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3,  height: '100%' }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
            >
              <Field.Text name="fournisseur" label="Fournisseur bon de commande" />
              <Field.Checkbox name="codeEmp" label="Code employé" />
              <Field.Select name="fuseaux" label="Fuseaux horaire America/Guadeloupe" >
                {['America/Guadeloupe'].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Field.Select>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Field.Text name="condition" label="Conditions Générale" InputLabelProps={{ shrink: true }} multiline rows={4}/>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Enregistrer
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
