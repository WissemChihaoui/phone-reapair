import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';
import { Grid, MenuItem } from '@mui/material';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export function Stepper({ steps, activeStep }) {
  return (
    <MuiStepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={({ active, completed }) => (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  color: 'text.disabled',
                  typography: 'subtitle2',
                  bgcolor: 'action.disabledBackground',
                  ...(active && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                  ...(completed && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                }}
              >
                {completed ? (
                  <Iconify width={14} icon="mingcute:check-fill" />
                ) : (
                  <Box sx={{ typography: 'subtitle2' }}>{index + 1}</Box>
                )}
              </Box>
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
}

// ----------------------------------------------------------------------

export function StepOne({ isIndividual, handleNext }) {
  const nextStepOne = (isInd) => {
    if (isInd) {
      isIndividual.onTrue();
      handleNext('stepTwo');
    } else {
      isIndividual.onFalse();
      handleNext('stepThree');

    }
    
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={6} padding={4}>
          <Button
            onClick={() => nextStepOne(true)}
            size="medium"
            color="info"
            variant="outlined"
            sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
          >
            <img alt="icon" src={`${CONFIG.assetsDir}/assets/icons/user.png`} width={60} />
            <Box alignItems="center" display="flex">
              <Typography variant="h5">Compte Individuel</Typography>
              <Iconify icon="solar:arrow-right-linear" width={28} />
            </Box>
          </Button>
        </Grid>
        <Grid xs={12} md={6} padding={4}>
          <Button
            onClick={() => nextStepOne(false)}
            size="medium"
            color="info"
            variant="outlined"
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
    </>
  );
}
export const USER_TYPE_OPTIONS = [
    { value: '1', label: 'Client particulier' },
    { value: '2', label: 'Client de passage' },
    { value: '3', label: 'Client pro' },
    { value: '4', label: 'Client internet' },
    { value: '5', label: 'Client(e) locale' },
    { value: '6', label: 'Client(e) professionel' },
    { value: '7', label: 'Client(e) de passage' },
  ];

export function StepTwo() {
    
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6} lg={4} padding={2}>
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
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.name"
          label="Nom et prénom"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.email"
          label="Email"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Phone
          name="StepUserData.phone"
          label="Téléphone" variant="filled"
          placeholder=""
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Select
          name="StepUserData.type"
          label="Type client" variant="filled"
          InputLabelProps={{ shrink: true }}
        >
            {USER_TYPE_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
        </Field.Select>
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepUserData.country"
          label="Ville"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={8} padding={2}>
        <Field.Text
          name="StepUserData.address"
          label="Adresse"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={4} padding={2}>
        <Field.Text
          name="StepUserData.zipCode"
          label="Code postal"
          type="number"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12}>
        <Field.Switch
              name="StepUserData.isVerified"
              labelPlacement="end"
              label={
                <>
                  <Typography variant="subtitle2">
                    Voulez-vous recevoir nos offres commerciales
                  </Typography>
                </>
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
      <Grid xs={12} md={6} lg={4} padding={2}>
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
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.raisonSocial"
          label="Raison social"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.email"
          label="Email"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Phone
          name="StepUserData.phone"
          label="Téléphone" variant="filled"
          placeholder=""
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={8} padding={2}>
        <Field.Text
          name="StepCompanyData.name"
          label="Nom du gérant"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={8} padding={2}>
        <Field.Text
          name="StepCompanyData.siret"
          label="Siret"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.tva"
          label="TVA"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} padding={2}>
        <Field.Checkbox name="primary" label="Exonéré de TVA union européen ou étranger" />
      </Grid>
      <Grid xs={12} md={6} lg={4} padding={2}>
        <Field.Text
          name="StepCompanyData.country"
          label="Ville"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={8} padding={2}>
        <Field.Text
          name="StepCompanyData.address"
          label="Adresse"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12} md={4} padding={2}>
        <Field.Text
          name="StepCompanyData.zipCode"
          label="Code postal"
          type="text"
          variant="filled"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid xs={12}>
        <Field.Switch
              name="StepCompanyData.isVerified"
              labelPlacement="end"
              label={
                <>
                  <Typography variant="subtitle2">
                    Voulez-vous recevoir nos offres commerciales
                  </Typography>
                </>
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
