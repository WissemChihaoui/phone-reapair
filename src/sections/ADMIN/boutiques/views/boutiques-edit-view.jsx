import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
} from '@mui/material';
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
import { useBoolean } from 'src/hooks/use-boolean';

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
  const password = useBoolean();
  const password1 = useBoolean();
  const password2 = useBoolean();
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
  const colorWatch = watch('color');
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
        <Form methods={methods} onSubmit={onSubmit}>
          <CustomBreadcrumbs
            heading="Modifier Boutique"
            links={[
              { name: 'Tableau de bord', href: paths.admin.root },
              { name: 'Boutiques', href: paths.admin.boutiques },
              { name: 'Modifier' },
            ]}
            sx={{ mb: { xs: 3, md: 5 } }}
            action={
              <>
                <Field.Switch label="Active ?" name="isActive" />
              </>
            }
          />

          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                  }}
                >
                  <Field.Text
                    name="actualPassword"
                    label="Mot de passe actuel"
                    placeholder="6+ characters"
                    type={password.value ? 'text' : 'password'}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={password.onToggle} edge="end">
                            <Iconify
                              icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Field.Text
                    name="newPassword"
                    label="Nouveau Mot de passe"
                    placeholder="6+ characters"
                    type={password1.value ? 'text' : 'password'}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={password1.onToggle} edge="end">
                            <Iconify
                              icon={password1.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Field.Text
                    name="confirmPassword"
                    label="Confirmer Mot de passe"
                    placeholder="6+ characters"
                    type={password2.value ? 'text' : 'password'}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={password2.onToggle} edge="end">
                            <Iconify
                              icon={password2.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Enregistrer Mot de passe
                    </LoadingButton>
                  </Stack>
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
                  <Field.Text name="smsToken" label="Token SMS" />
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
                  <Field.Select name="typeClient" label="Type de client">
                    {['Client'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Box>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                  }}
                >
                  <Field.Checkbox name="certificat" label="Certificat" />
                  <Field.DatePicker name="certificationDate" label="Date certification" />
                </Box>
              </Card>
            </Grid>

            <Grid xs={12} md={8}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Field.Text
                  name="commentaire"
                  label="Commentaire"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={4}
                />
              </Card>
            </Grid>

           
            <Grid xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                  }}
                >
                  <Field.DatePicker name="date_achat" label="Date d'achat" />
                  <Field.DatePicker name="date_finContract" label="Date fin contrat" />
                </Box>
              </Card>
            </Grid>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Field.Text
                  name="note"
                  label="Note"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={4}
                />
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
              </Card>
            </Grid>
            <Grid>
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Enregistrer
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </DashboardContent>
    </>
  );
}
