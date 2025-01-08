import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Step, StepLabel, Stepper } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';

// const steps = ['Réparation', 'Produit', 'Client', 'Facturation', 'Résumé'];
const steps = ['stepOne', 'stepTwo', 'stepThree', 'stepFour', 'stepFive'];


const ReparationSchema = zod.object({
    date: schemaHelper.date({
        message: { required_error: 'Date de la réparation est requis!' },
    }),
    ref: zod.string().min(1, { message: 'Votre référence de réparation est requis!' }),
    type: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
})

const ProduitSchema = zod.object({
    produit: zod.string().min(1, { message: 'Choisir un produit' }),
    photo: zod.string(),
    marque: zod.string().min(1, { message: 'Choisir un marque'}),
    refCommerciale : zod.string().min(1, { message: 'Référence commerciale est requis'}),
    serie: zod.string().min(1, { message: 'Numéro de série' }),
    photoPlaque: zod.string(),
    naturePanne: zod.string(),
    iris: zod.string(),
    bonDepose: zod.string(),
})

const ClientSchema = zod.object({
    civilite: zod.string().min(1, { message: 'Choisir la civilité de votre client'}),
    firstName: zod.string().min(1, {message: 'Nom de client est requis !'}),
    lastName: zod.string().min(1, {message: 'Prénom de client est requis !'}),
    email: zod
        .string()
        .min(1, { message: "L'email est requis!" })
        .email({ message: "L'email n'est pas valid" }),
    phone: zod.string(),
    adresse: zod.string().min(1, {message: "L'adresse est requis!"}),
    ville: zod.string().min(1, {message: "L'adresse est requis!"}),
    zipCode: zod.string().min(1, {message: "L'adresse est requis!"}),
})

const FactureSchema = zod.object({
    amount: zod.number(),
    bonus: zod.number().min(1, { message: 'Choisir un de ces options' }),
    facture: zod.string()
})

const WizardSchema = zod.object({
    stepOne: ReparationSchema,
    stepTwo: ProduitSchema,
    stepThree: ClientSchema,
    stepFour: FactureSchema,
})

export default function EcosystemPageView() {
  
  const defaultValues = useMemo(
    () => ({
        stepOne: {
            date: null,
            ref: "",
            type: null
        },
        stepTwo: {
            produit: null,
            photo: null,
            marque: null,
            refCommerciale: null,
            serie: null,
            photoPlaque: null,
            naturePanne: null,
            iris: null,
            bonDepose: null,
        },
        stepThree: {
            amount:0,
            bonus:0,
            facture: null,
        },
        stepFour: {
            civilite:null,
            firstName: '',
            lastName:'',
            email: '',
            phone: null,
            adresse: '',
            ville:'',
            zipCode: null
        }
    }),[]
  )

  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    mode: 'onChange',
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

  const handleBack = () => {
    reset();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 
  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.info('DATA', data);
      handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Ajouter Ecosystem"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Boutique', href: paths.dashboard.boutique.configurations },
            { name: 'Ecosystem' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card sx={{ p: 2 }}>
        <Form methods={methods} onSubmit={onSubmit}>

        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
          gap={3}
          display="flex"
          flexDirection="column"
          sx={{
            p: 3,
            mb: 3,
            minHeight: 240,
            borderRadius: 1.5,
            border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
          }}
        >
            {activeStep === 0 && <Field.Text name="stepOne.ref" label="First name" />}
        </Box>

        <Box display="flex">
            {activeStep !== 0 && <Button onClick={handleBack}>Retoure</Button>}

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
            {activeStep === 2 && (
              <Button type="submit" variant="contained" onClick={() => handleNext('stepThree')}>
                Suivant
              </Button>
            )}
            {activeStep === 3 && (
              <Button type="submit" variant="contained" onClick={() => handleNext('stepFour')}>
                Suivant
              </Button>
            )}

            {activeStep === steps.length - 1 && (
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Enregistrer
              </LoadingButton>
            )}
          </Box>
      </Form>


        </Card>
      </DashboardContent>
    </>
  );
}
