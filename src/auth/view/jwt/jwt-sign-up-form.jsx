import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { IconButton, InputAdornment } from '@mui/material';

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

export function StepOne(){
    return (
        <>
          <Field.Text
            name="stepOne.codeParrainage"
            label="Code de parrainage de la boutique"
            InputLabelProps={{ shrink: true }}
          />
          <Field.Text
            name="stepOne.nomBoutique"
            label="Nom de la boutique"
            InputLabelProps={{ shrink: true }}
          />
          <Field.Text
            name="stepOne.emailBoutique"
            label="Email de boutique"
            InputLabelProps={{ shrink: true }}
          />
        </>
      );
}

export function StepTwo(){
    return(
        <>
            <Box gap={3} display="flex" flexDirection="column">
                <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Field.Text name="stepTwo.nomClient" label="Nom" InputLabelProps={{ shrink: true }} />
                    <Field.Text name="stepTwo.prenomClient" label="Prénom" InputLabelProps={{ shrink: true }} />
                </Box>
                <Field.Text name="stepTwo.adresseClient" label="Adresse" InputLabelProps={{ shrink: true }} />
                <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Field.Text name="stepTwo.codePostal" label="Code Postale" InputLabelProps={{ shrink: true }} />
                    <Field.Text name="stepTwo.villeClient" label="Ville" InputLabelProps={{ shrink: true }} />
                </Box>
                <Field.Text name="stepTwo.telephone" label="Téléphone" InputLabelProps={{ shrink: true }} />
            </Box>
        </>
    )
}

export function StepThree() {
    const password = useBoolean();
    return(
        <>
        <Field.Text name="stepThree.adminEmail" label="Email Admin" InputLabelProps={{ shrink: true }} />
        <Field.Text
        name="stepThree.password"
        label="Mot de passe"
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

      <Field.Text
        name="stepThree.confirmPassword"
        label="Confirmer mot de passe"
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
      </>
    )
}
  