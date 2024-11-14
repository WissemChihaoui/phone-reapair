import { useCallback, useState } from 'react';
import { paths } from 'src/routes/paths';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';

import { DashboardContent } from 'src/layouts/dashboard';
import { zodResolver } from '@hookform/resolvers/zod';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { LoadingButton } from '@mui/lab';
import { useBoolean } from 'src/hooks/use-boolean';

import { Box, Button, Card } from '@mui/material';
import { Form } from 'src/components/hook-form';
import { UserNewEditForm } from '../user-new-edit-form';
import { StepOne, Stepper, StepThree, StepTwo } from '../create-steps';

// ----------------------------------------------------------------------
const STEPS = ['Type de client', 'Informations'];

const StepUserData = zod.object({
  id: zod.string().min(1, { message: ''}),
  name: zod.string().min(1, {message: 'Nom et prénom sont requis'}),
  email: zod.string().min(1, {message: 'Email est requis!'}).email({message: 'Email pas valid!'}),
  phone: zod.string().min(1, {message: 'Téléphone est requis'}),
  type: zod.string().min(1, {message:"Type de client est requis!"}),
  country: zod.string().min(1, {message: "Ville est requis!"}),
  address: zod.string().min(1, {message: "Adress est requis!"}),
  address: zod.string().min(1, {message: "Adress est requis!"}),
})

const WizardSchema = zod.object({
  stepTwo: StepUserData,
});

const defaultValues = {
  stepOne: {},
  StepUserData: { id: "87-9558", name:"", email: "", phone:"" },
  stepThree: { email: '' },
};


export function UserCreateView() {
  const [activeStep, setActiveStep] = useState(0);
  const isIndividual = useBoolean(true)
  
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

  const handleBack = useCallback(() => {
    setActiveStep((currentStep) => currentStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setActiveStep(0);
  }, [reset]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.info('DATA', data);
      handleNext();
    } catch (error) {
      console.error(error);
    }
  });

  const completedStep = activeStep === STEPS.length;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Creér un client"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Clients', href: paths.dashboard.client.root },
          { name: 'Creér' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card sx={{p: 5, width: 1, mx: 'auto'}}>
        <Form methods={methods} onSubmit={onSubmit}>
          <Stepper steps={STEPS} activeStep={activeStep} />
          
            {activeStep === 0 && <StepOne isIndividual={isIndividual} handleNext={handleNext}/>}
            {activeStep === 1 &&  isIndividual.value && <StepTwo />}
            {activeStep === 1 &&  !isIndividual.value && <StepThree />}
            {completedStep && <p>Done</p>}
            {!completedStep && (
          <Box display="flex">
            {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}

            <Box sx={{ flex: '1 1 auto' }} />

            
            {activeStep === STEPS.length - 1 && (
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            )}
          </Box>
        )}
        </Form>
      </Card>
      {/* <UserNewEditForm />  */}
    </DashboardContent>
  );
}
