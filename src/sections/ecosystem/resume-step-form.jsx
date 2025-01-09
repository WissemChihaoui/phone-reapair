import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Iconify } from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

export default function ResumeStepForm({ setActiveStep }) {
  const [controlled, setControlled] = useState(false);

  const { control, setValue, watch } = useFormContext();
  const values = watch();

  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setControlled(isExpanded ? panel : false);
  };

  const renderClient = (
    <Accordion expanded={controlled === 1} onChange={handleChangeControlled(1)}>
      <AccordionSummary
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
      >
        <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
          Information du client
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Civilité:
            </Box>
            {values.stepThree.civilite}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Nom:
            </Box>
            {values.stepThree.firstName}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Prénom:
            </Box>
            {values.stepThree.lastName}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Email:
            </Box>
            {values.stepThree.email}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Téléphone:
            </Box>
            {values.stepThree.phone}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Adresse:
            </Box>
            {values.stepThree.adresse}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Ville:
            </Box>
            {values.stepThree.ville}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Code postale:
            </Box>
            {values.stepThree.zipCode}
          </Stack>
        </Box>
        <Stack m={2} display="flex" alignItems="flex-end">
          <Button onClick={()=>setActiveStep(2)} variant="contained">Modifier</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );

  const renderProduct = (
    <Accordion expanded={controlled === 2} onChange={handleChangeControlled(2)}>
      <AccordionSummary
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
      >
        <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
          Produit
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Produit
            </Box>
            {values.stepTwo.produit}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Marque:
            </Box>
            {values.stepTwo.marque}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Réf Commerciale:
            </Box>
            {values.stepTwo.refCommerciale}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Num Série:
            </Box>
            {values.stepTwo.serie}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
              Nature de la panne:
            </Box>
            {values.stepTwo.naturePanne}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Code IRIS:
            </Box>
            {values.stepTwo.iris}
          </Stack>
         
        </Box>
        <Stack m={2} display="flex" alignItems="flex-end">
          <Button onClick={()=>setActiveStep(1)} variant="contained">Modifier</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )

  const renderReparation = (
    <Accordion expanded={controlled === 3} onChange={handleChangeControlled(3)}>
      <AccordionSummary
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
      >
        <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
          Réparation
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Date de la réparation
            </Box>
            {fDate(values.stepOne.date)}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Référence de réparation:
            </Box>
            {values.stepOne.refe}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Type d&apos;intervention:
            </Box>
            {values.stepOne.type}
          </Stack>
          
         
        </Box>
        <Stack m={2} display="flex" alignItems="flex-end">
          <Button onClick={()=>setActiveStep(0)} variant="contained">Modifier</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
  const renderFacture = (
    <Accordion expanded={controlled === 4} onChange={handleChangeControlled(4)}>
      <AccordionSummary
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
      >
        <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
          Facture
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', flexShrink: 0 }}>
            Montant T.T.C avant déduction du Bonus réparation
            </Box>
            {fCurrency(values.stepFour.amount)}
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ color: 'text.secondary', flexShrink: 0 }}>
            Bonus réparation
            </Box>
            {fCurrency(values.stepFour.bonus)}
          </Stack>
         
        </Box>
        <Stack m={2} display="flex" alignItems="flex-end">
          <Button onClick={()=>setActiveStep(3)} variant="contained">Modifier</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
  return( 
    <>
        {renderClient}
        {renderProduct}
        {renderReparation}
        {renderFacture}
    </>
  );
}
