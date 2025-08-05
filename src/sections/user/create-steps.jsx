import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { _clientIndvTypes } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function StepOne({ isIndividual, handleNext }) {
  const nextStepOne = (isInd) => {
    if (isInd) {
      isIndividual.onTrue();
    } else {
      isIndividual.onFalse();
    }
    console.log(isIndividual);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} padding={4}>
        <Button
          onClick={() => nextStepOne(true)}
          size="medium"
          color="primary"
          variant={isIndividual.value ? 'contained' : 'outlined'}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
        >
          <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/user.png`} width={60} />
          <Box alignItems="center" display="flex">
            <Typography variant="h5">Compte Individuel</Typography>
            <Iconify icon="solar:arrow-right-linear" width={28} />
          </Box>
        </Button>
      </Grid>
      <Grid item xs={12} md={6} padding={4}>
        <Button
          onClick={() => nextStepOne(false)}
          size="medium"
          color="primary"
          variant={isIndividual.value ? 'outlined' : 'contained'}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
        >
          <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/office.png`} width={60} />
          <Box alignItems="center" display="flex">
            <Typography variant="h5">Société</Typography>
            <Iconify icon="solar:arrow-right-linear" width={28} />
          </Box>
        </Button>
      </Grid>
    </Grid>
  );
}
export function StepTwo() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.id"
          label="Id"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
          helperText="Id unique et pas remplacable"
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.name"
          label="Nom et prénom"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} item md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.email"
          label="Email"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} item md={6} lg={4} padding={2}>
        <Field.Phone
          name="StepUserData.phone"
          label="Téléphone"
          variant="filled"
          placeholder=""
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} item md={6} lg={4} padding={2}>
        <Field.Select
          name="StepUserData.type"
          label="Type client"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        >
          {_clientIndvTypes.map((status, index) => (
            <MenuItem key={index} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </Field.Select>
      </Grid>
      <Grid xs={12} item md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.country"
          label="Ville"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} item md={8} padding={2}>
        <Field.Text
          name="StepUserData.address"
          label="Adresse"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} item md={4} padding={2}>
        <Field.Text
          name="StepUserData.zipCode"
          label="Code postal"
          type="number"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} item>
        <Field.Switch
          name="StepUserData.isVerified"
          labelPlacement="end"
          label={
            <Typography variant="subtitle2">
              Voulez-vous recevoir nos offres commerciales
            </Typography>
          }
          sx={{ mx: 0, width: 1 }}
        />
      </Grid>
    </Grid>
  );
}

export function StepThree() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.id"
          label="Id"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
          helperText="Id unique et pas remplacable"
          disabled
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.raisonSocial"
          label="Raison social"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.email"
          label="Email"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Phone
          name="StepUserData.phone"
          label="Téléphone"
          variant="filled"
          placeholder=""
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.name"
          label="Nom du gérant"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.siret"
          label="Siret"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.tva"
          label="TVA"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Checkbox name="primary" label="Exonéré de TVA union européen ou étranger" />
      </Grid>
      <Grid item xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.country"
          label="Ville"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8} padding={2}>
        <Field.Text
          name="StepCompanyData.address"
          label="Adresse"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4} padding={2}>
        <Field.Text
          name="StepCompanyData.zipCode"
          label="Code postal"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Switch
          name="StepCompanyData.isVerified"
          labelPlacement="end"
          label={
            <Typography variant="subtitle2">
                Voulez-vous recevoir nos offres commerciales
              </Typography>
          }
          sx={{ mx: 0, width: 1 }}
        />
      </Grid>
    </Grid>
  );
}

export function StepCompleted({ onReset }) {
  return (
    <Box
      gap={3}
      display="flex"
      flex="1 1 auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{ borderRadius: 'inherit', bgcolor: 'background.neutral' }}
    >
      <Typography variant="subtitle1">All steps completed - you&apos;re finished</Typography>

      <Button
        variant="outlined"
        onClick={onReset}
        startIcon={<Iconify icon="solar:restart-bold" />}
      >
        Reset
      </Button>
    </Box>
  );
}
