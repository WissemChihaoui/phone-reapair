import { Button, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { Field } from 'src/components/hook-form';
import { useFormContext } from 'react-hook-form';
import { Iconify } from 'src/components/iconify';
import RapportPanneModal from './rapport-panne-modal';
import LockPadModal from './lock-pad-modal';
import MarqueAddModal from './marque-add-modal';
import ModeleAddModal from './model-add-modal';
import DocumentSectionView from './document/document-section-view';

const Material = ['Article 1'];
const Marque = ['Article 1'];
const Modele = ['Article 1'];
const Techniciens = ['Technicien'];
const Etat = ['Comme neuf', 'Très bon état', 'Bon état', 'Correct', 'Endommagé'];

export default function SingleArticleForm({ index }) {
  const { control } = useFormContext();
  const openRapport = useBoolean();
  const openPad = useBoolean();
  const openAddMarque = useBoolean();
  const openAddModele = useBoolean();

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={4}>
          <Field.Autocomplete
            label="Type de matériel"
            name={`products[${index}].type`}
            options={Material}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5} direction="row">
            <Field.Autocomplete
              sx={{ width: '100%' }}
              label="Marque"
              name={`products[${index}].marque`}
              options={Marque}
            />
            <Button variant="contained" onClick={openAddMarque.onTrue}>+</Button>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5} direction="row">
            <Field.Autocomplete
              sx={{ width: '100%' }}
              label="Modéle"
              name={`products[${index}].modele`}
              options={Modele}
            />
            <Button variant="contained" onClick={openAddModele.onTrue}>+</Button>
          </Stack>
        </Grid>

        <Grid xs={12} lg={8}>
          <Field.Text name={`products[${index}].serie`} label="N° Série / IMEI" />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Autocomplete
            label="État"
            name={`products[${index}].etat`}
            options={Etat}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <Field.Text name={`products[${index}].accessoire`} label="Accessoire" />
        </Grid>

        <Grid xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={openRapport.onTrue}
            startIcon={<Iconify icon="mingcute:settings-3-fill" />}
          >
            Rapport des pannes
          </Button>
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Text name={`products[${index}].noteClient`} label="Note Client" />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Text name={`products[${index}].noteIntervention`} label="Note intervention" />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Text name={`products[${index}].noteInterne`} label="Note interne" />
        </Grid>

        <Grid xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={openPad.onTrue}
            startIcon={<Iconify icon="mdi:lock-pattern" />}
          >
            Schéma de verrouillage
          </Button>
        </Grid>

        <Grid xs={12} md={4}>
          <Field.DatePicker name={`products[${index}].dateRestitution`} label="Date de restitution" />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Autocomplete
            label="Technicien"
            name={`products[${index}].technicien`}
            options={Techniciens}
          />
        </Grid>

        <Divider sx={{ my: 1, width: '100%' }} />

        <Grid xs={12}>
          <DocumentSectionView formIndex={index} />
        </Grid>
      </Grid>

      <RapportPanneModal index={index} open={openRapport.value} onClose={openRapport.onFalse} />
      <LockPadModal index={index} open={openPad.value} onClose={openPad.onFalse} />
      <MarqueAddModal open={openAddMarque.value} onClose={openAddMarque.onFalse} />
      <ModeleAddModal open={openAddModele.value} onClose={openAddModele.onFalse} />
    </>
  );
}
