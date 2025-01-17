import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardContent, CardHeader, Divider, InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { LoadingButton } from '@mui/lab';
import { Iconify } from 'src/components/iconify';
import { fData } from 'src/utils/format-number';
import { Label } from 'src/components/label';

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
export const BoutiqueSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
});

export default function BoutiquesEditView() {
  const defaultValues = {
    name: '',
    email: '',
    phoneNumber: '',
  };
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BoutiqueSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const colorWatch = watch('color')  
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Modifier Boutique"
          links={[
            { name: 'Tableau de bord', href: paths.admin.root },
            { name: 'Boutiques', href: paths.admin.boutiques },
            { name: 'Modifier' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
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
                

                {/* <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            /> */}

                <Field.Text
                  name="color"
                  label="Couleur"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Label style={{ background: colorWatch }} />
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
                  {/* <Field.Text name="iban" label="IBAN/RIB" /> */}
                  {/* <Field.Text name="capitalSocial" label="Capital Social" /> */}
                  <Field.Text name="siret" label="Siret" />
                  {/* <Field.Text name="rcs" label="Numéro RCS" /> */}
                  <Field.Text name="tva" label="Numéro TVA INTRA" />
                  {/* <Field.Checkbox name="caisse" label="Utilisation Caisse" /> */}
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
                </Box>
              </Card>
            </Grid>
            
            
            <Grid xs={12}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Field.Text
                  name="condition"
                  label="Conditions Générale"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={4}
                />

                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Enregistrer
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </DashboardContent>
    </>
  );
}
