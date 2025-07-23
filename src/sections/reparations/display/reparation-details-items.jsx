import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import { accordion } from 'src/theme/core/components/accordion';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { fDate, today } from 'src/utils/format-time';
import { useBoolean } from 'src/hooks/use-boolean';
import RapportPanneModal from '../rapport-panne-modal';
import DisplayRapportAvant from './display-rapport-avant';
import DisplayAttestaionModal from './display-attestation-modal';
import DisplaySchemaModal from './display-schema-modal';

// ----------------------------------------------------------------------

export function OrderDetailsItems({
  taxes,
  shipping,
  discount,
  subtotal,
  items = [],
  totalAmount,
}) {
 const [controlled, setControlled] = useState(0);

  const handleChangeControlled = (panel) => (event, isExpanded) => {
    setControlled(isExpanded ? panel : false);
  };

  const openRapport = useBoolean()
  const openAttestation = useBoolean()
  const openSchema = useBoolean()

  return (
    <Card>
      <CardHeader title="Details" />

      <Scrollbar>
        {items.map((item, index) => (
          <Accordion
            key={index}
            onChange={handleChangeControlled(index)}
            expanded={controlled === index}
          >
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Stack
                key={item.id}
                direction="row"
                alignItems="center" fontSize="12px"
                sx={{
                  px: 4,
                  minWidth: 640,
                }}
              >
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />

                <Box sx={{ typography: 'body2' }}>x{item.quantity}</Box>

                <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
                  {fCurrency(item.price)}
                </Box>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}
                    >
                      Matériel
                    </Box>
                    Smartphone
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}
                    >
                      Marque
                    </Box>
                    Apple
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}
                    >
                      Modèle
                    </Box>
                    Iphone 11
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Numéro de série / Imei :
                    </Box>
                    7899-288-55587
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Note Client :
                    </Box>
                    azerty lorem ipsuem
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Note Boutique :
                    </Box>
                    azerty lorem ipsuem
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Note Boutique Interne :
                    </Box>
                    azerty lorem ipsuem
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Date de restitution souhaitée :
                    </Box>
                    {fDate(today())}
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Technicien en charge de la réparation :
                    </Box>
                    Wissem Chihaoui
                  </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                  <Stack direction="row" alignItems="center" fontSize="12px">
                    <Box
                      component="span"
                      sx={{ color: 'text.secondary',flexShrink: 0 }}
                    >
                      Tâche :
                    </Box>
                    écran iPhone 7 blanc compatible
                  </Stack>
                </Grid>
                <Grid xs={12}>
                  <Stack display="flex" gap={2} flexDirection="row" flexWrap="wrap">    
                    <Button variant='contained' color='success' onClick={()=> openSchema.onTrue()}>Schéma</Button>
                    <Button variant='contained' color='primary' onClick={()=> openRapport.onTrue()}>Rapport Avant</Button>
                    <Button variant='contained' color='primary' onClick={()=> openRapport.onTrue()}>Rapport Aprés</Button>
                    <Button variant='contained' color='primary' onClick={()=> openAttestation.onTrue()}>Attestation d&apos;irréparabilité</Button>
                  </Stack>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Scrollbar>
      <DisplayRapportAvant index={1} open={openRapport.value} onClose={openRapport.onFalse}/>
      <DisplayAttestaionModal index={1} open={openAttestation.value} onClose={openAttestation.onFalse}/>
      <DisplaySchemaModal open={openSchema.value} onClose={openSchema.onFalse} pathScreen={[0,1,2,3,4,5,6]}/>
    </Card>
  );
}
