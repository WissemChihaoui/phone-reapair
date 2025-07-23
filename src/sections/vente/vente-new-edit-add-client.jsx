import { Box, Button, Card, Dialog, DialogContent, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { z as zod } from 'zod';
import { Form } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { StepOne, StepThree, StepTwo } from '../user/create-steps';

const StepUserData = zod.object({
  id: zod.string().min(1, { message: '' }),
  name: zod.string().min(1, { message: 'Nom et prénom sont requis' }),
  email: zod
    .string()
    .min(1, { message: 'Email est requis!' })
    .email({ message: 'Email pas valid!' }),
  phone: zod.string().min(1, { message: 'Téléphone est requis' }),
  type: zod.string().min(1, { message: 'Type de client est requis!' }),
  country: zod.string().min(1, { message: 'Ville est requis!' }),
  address: zod.string().min(1, { message: 'Adress est requis!' }),
  zipCode: zod.number().min(1, { message: 'Code postale est requis!' }),
});

const StepCompanyData = zod.object({
  id: zod.string().min(1, { message: '' }),
  raisonSocial: zod.string().min(1, { message: 'Raison Social est requis' }),
  email: zod
    .string()
    .min(1, { message: 'Email est requis!' })
    .email({ message: 'Email pas valid!' }),
  phone: zod.string().min(1, { message: 'Téléphone est requis' }),
  name: zod.string().min(1, { message: 'Nom et prénom sont requis' }),
  siret: zod.string().min(1, { message: 'Numéro de siret est requis!' }),
  tva: zod.string().min(1, { message: 'TVA est requis!' }),
  country: zod.string().min(1, { message: 'Ville est requis!' }),
  address: zod.string().min(1, { message: 'Adress est requis!' }),
  zipCode: zod.number().min(1, { message: 'Code postale est requis!' }),
});
const WizardSchema = zod.object({
  stepTwo: StepUserData,
  stepThree: StepCompanyData,
});
const defaultValues = {
  stepOne: { clientType: 'indv' },
  StepUserData: {
    id: '87-9558',
    name: '',
    email: '',
    phone: '',
    type: '',
    country: '',
    address: '',
    zipCode: '',
  },
  stepThree: {
    id: '87-9558',
    raisonSocial: '',
    email: '',
    phone: '',
    name: '',
    siret: '',
    tva: '',
    country: '',
    address: '',
    zipCode: '',
  },
};

export default function VenteNewEditAddClient({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const isIndividual = useBoolean(true);
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
        console.log('active step :', step);
        const isValid = await trigger(step);

        if (true) {
          clearErrors();
          setActiveStep((currentStep) => currentStep + 1);
        }
      } else {
        setActiveStep((currentStep) => currentStep + 1);
      }
    },
    [trigger, clearErrors]
  );

  const onSubmit = handleSubmit(async (data) => {
    console.log('hey');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.info('DATA', data);
      handleNext();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Dialog maxWidth="lg" fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Box sx={{ p: 2, width: 1, mx: 'auto' }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <StepOne isIndividual={isIndividual} />
            {isIndividual.value ? <StepTwo /> : <StepThree />}

            <Stack
              display="flex"
              justifyContent="flex-end"
              gap={1}
              flexDirection="row"
              width="100%"
              alignItems="flex-end"
              sx={{ mt: 3 }}
            >
              <Button variant="outlined" onClick={() => onClose()}>
                Annuler
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Enregistrer
              </LoadingButton>
            </Stack>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
