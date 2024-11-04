import { z as zod } from 'zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { signUp } from '../../context/jwt';
import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';
import { StepOne, Stepper, StepThree, StepTwo } from './jwt-sign-up-form';

// ----------------------------------------------------------------------
const STEPS = ['Données de boutique', 'Données personelles', 'Authentification'];

const StepOneSchema = zod.object({
  codeParrainage: zod.string().min(1, {message: 'Code de parrainage de la boutique est requis'}),
  nomBoutique: zod.string().min(1, { message: 'Nom de la boutique est requis!'}),
  emailBoutique: zod.string().min(1, { message: 'Nom de la boutique est requis!'}),
});

const StepTwoSchema = zod.object({
  nomClient: zod.string().min(1, { message: 'Nom de client est requis!'}),
  prenomClient: zod.string().min(1, {message: 'Prénom de client est requis!'}),
  adresseClient: zod.string().min(1, { message: 'Adresse de client est requis!'}),
  codePostal : zod.string()
                  .min(1, { message: 'Code postal est requis!'})
                  .min(6, { message: "Code postale n'est pas valide"}),
  villeClient : zod.string().min(1, { message: "Ville est requis"}),
  telephone : zod.string()
                  .min(1, { message: 'Téléphone de client est requis!'})
                  .min(6, { message: "Téléphone n'est pas valide!"})
});

const StepThreeSchema = zod.object({
  adminEmail : zod 
                .string()
                .min(1, { message: 'Email est requis'})
                .email({message: "Email n'est pas valide!"}),
  password: zod
    .string()
    .min(1, { message: 'Mot de pass est requis!' })
    .min(6, { message: 'Le mot de passe doit comporter au moins 6 caractères !' }),
  confirmPassword: zod.string().min(1, { message: 'Confirmer mot de pass est requis!' }),
});

const WizardSchema = zod.object({
  stepOne: StepOneSchema,
  stepTwo: StepTwoSchema,
  stepThree: StepThreeSchema,
});

const defaultValues = {
  stepOne : { codeParrainage: '',nomBoutique: '', emailBoutique:''},
  stepTwo : { nomClient: '', prenomClient:'', adresseClient:'', codePostal: null,villeClient:'', telephone:null},
  stepThree : { adminEmail:'', password:'', confirmPassword:''}
}
// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm({
    resolver: zodResolver(WizardSchema),
    defaultValues,
  });

  const {
    reset,
    trigger,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleNext = useCallback(
    async (step) => {
      if (step) {
        const isValid = await trigger(step);

        if (isValid) {
          clearErrors();
          setActiveStep((currentStep) => currentStep + 1);
        }
      } else {
        setActiveStep((currentStep) => currentStep + 1);
      }
    },
    [trigger, clearErrors]
  );

  const handleBack = useCallback(() => {
    setActiveStep((currentStep) => currentStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);

  const completedStep = activeStep === STEPS.length;
 

  return (
    <>
      <FormHead
        title="Créer un compte"
        description={
          <>
            {`Vous avez déjà un compte ? `}
            <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
              Se connecter
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Stepper steps={STEPS} activeStep={activeStep} />

        <Box marginBottom={4} gap={3} display="flex" flexDirection="column">
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
        </Box>

        {!completedStep && (
          <Box display="flex">
            {activeStep !== 0 && <Button onClick={handleBack}>Retour</Button>}

            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep === 0 && (
              <Button type="submit" variant="contained" onClick={() => handleNext('stepOne')}>
                Suivant
              </Button>
            )}

            {activeStep === 1 && (
              <Button type="submit" variant="contained" onClick={() => handleNext('stepTwo')}>
                Suivant
              </Button>
            )}

            {activeStep === STEPS.length - 1 && (
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Enregistrer
              </LoadingButton>
            )}
          </Box>
        )}
      </Form>
      
      <SignUpTerms />
    </>
  );
}
