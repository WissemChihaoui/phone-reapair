import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Step, StepLabel, Stepper } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { Form, schemaHelper } from 'src/components/hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { LoadingButton } from '@mui/lab';
import { toast } from 'sonner';

import ReparationStepForm from '../reparation-step-form';
import ProduitStepForm from '../produit-step-form';
import ClientStepForm from '../client-step-form';
import FactureStepForm from '../facture-step-form';
import ResumeStepForm from '../resume-step-form';


const stepLabels = ['Réparation', 'Produit', 'Client', 'Facturation', 'Résumé'];

const ReparationSchema = zod.object({
  date: schemaHelper.date({
    message: { required_error: 'Date de la réparation est requis!' },
  }),
  refe: zod.string().min(1, { message: 'Votre référence de réparation est requis!' }),
  type: zod.string().min(1, { message: 'Choisissez au moins une option !' }),
});

const ProduitSchema = zod.object({
  produit: zod.string().min(1, { message: 'Choisir un produit' }),
  photo: zod.string(),
  marque: zod.string().min(1, { message: 'Choisir un marque' }),
  refCommerciale: zod.string().min(1, { message: 'Référence commerciale est requis' }),
  serie: zod.string().min(1, { message: 'Numéro de série' }),
  photoPlaque: zod.string(),
  naturePanne: zod.string(),
  iris: zod.string(),
  bonDepose: zod.string(),
});

const ClientSchema = zod.object({
  civilite: zod.string().min(1, { message: 'Choisir la civilité de votre client' }),
  firstName: zod.string().min(1, { message: 'Nom de client est requis !' }),
  lastName: zod.string().min(1, { message: 'Prénom de client est requis !' }),
  email: zod
    .string()
    .min(1, { message: "L'email est requis!" })
    .email({ message: "L'email n'est pas valid" }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  adresse: zod.string().min(1, { message: "L'adresse est requis!" }),
  ville: zod.string().min(1, { message: "L'adresse est requis!" }),
  zipCode: zod.string().min(1, { message: "L'adresse est requis!" }),
});

const FactureSchema = zod.object({
  amount: zod.number().min(1, { message: 'Monatnt invalide!' }),
  bonus: zod.string().min(1, { message: 'Choisir un de ces options!' }),
  facture: zod.string(),
});

const WizardSchema = zod.object({
    stepOne: ReparationSchema,
    stepTwo: ProduitSchema,
    stepThree: ClientSchema,
    stepFour: FactureSchema,
  });
export default function EcoCardContent() {
    const defaultValues = useMemo(
        () => ({
          stepOne: {
            date: null,
            refe: '',
            type: '',
          },
          stepTwo: {
            produit: '',
            photo: '',
            marque: '',
            refCommerciale: '',
            serie: '',
            photoPlaque: '',
            naturePanne: '',
            iris: '',
            bonDepose: '',
          },
          stepThree: {
            civilite: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            adresse: '',
            ville: '',
            zipCode: null,
          },
          stepFour: {
            amount: 0,
            bonus: '',
            facture: "",
          },
        }),
        []
      );
    
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
            console.log('Validation Result:', isValid);
            console.log('Errors:', methods.formState.errors);
            if (isValid) {
              clearErrors();
              setActiveStep((currentStep) => currentStep + 1);
            }else{
              toast.error('Vérifier les champs!');
            }
          } else {
            setActiveStep((currentStep) => currentStep + 1);
          }
        },
        [trigger, clearErrors, methods]
      );
    
      const handleBack = () => {
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
        <Card sx={{ p: 2 }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {stepLabels.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
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
              {activeStep === 0 && <ReparationStepForm />}
              {activeStep === 1 && <ProduitStepForm />}
              {activeStep === 2 && <ClientStepForm />}
              {activeStep === 3 && <FactureStepForm />}
              {activeStep === 4 && <ResumeStepForm setActiveStep={setActiveStep} />}
            </Box>

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

              {activeStep === stepLabels.length - 1 && (
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Enregistrer
                </LoadingButton>
              )}
            </Box>
          </Form>
        </Card>
    </>
  )
}
