import { Button, Chip, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import PieceFormRepeater from './piece-form-repeater';
import OeuvreFormRepeater from './oeuvre-from-repeater';
import RapportPanneModal from './rapport-panne-modal';
import LockPadModal from './lock-pad-modal';
import MarqueAddModal from './marque-add-modal';
import ModeleAddModal from './model-add-modal';

const Material = ['Article 1'];
const Marque = ['Article 1'];
const Modele = ['Article 1'];
const Techniciens = ['Technicien'];
const Etat = ['Comme neuf', 'Très bon état', 'Bon état', 'Correct', 'Endommagé'];
export default function SingleArticleForm({ index }) {
    const openRapport = useBoolean()
    const openPad = useBoolean()
    const openAddMarque = useBoolean()
    const openAddModele = useBoolean()
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5}>
            <Field.Autocomplete
              label="Type de matériel"
              name={`products[${index}].type`}
              autoHighlight
              options={Material.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5} display="flex" flexDirection="row">
            <Field.Autocomplete
              sx={{ width: '100%' }}
              label="Marque"
              name={`products[${index}].marque`}
              autoHighlight
              options={Marque.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
            <Button color="primary" variant="contained" size="large" onClick={()=> openAddMarque.onTrue()}>
              +
            </Button>
          </Stack>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5} display="flex" flexDirection="row">
            <Field.Autocomplete
              sx={{ width: '100%' }}
              label="Modéle"
              name={`products[${index}].modele`}
              autoHighlight
              options={Modele.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
            <Button color="primary" variant="contained" size="large" onClick={()=> openAddModele.onTrue()}>
              +
            </Button>
          </Stack>
        </Grid>
        <Grid xs={12} lg={8}>
          <Field.Text name={`products[${index}].serie`} label="N° Série / IMEI" />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Autocomplete
            sx={{ width: '100%' }}
            label="État"
            name={`products[${index}].etat`}
            autoHighlight
            options={Etat.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <Field.Text name={`products[${index}].accessoire`} label="Accessoire" />
        </Grid>
        <Grid xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            startIcon={<Iconify icon="mingcute:settings-3-fill" />}
            onClick={()=>openRapport.onTrue()}
          >
            Rapport des pannes
          </Button>
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text
            name={`products[${index}].noteClient`}
            label="Note Client (Code de déverrouillage / code Sim )"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text
            name={`products[${index}].noteIntervention`}
            label="Note visible sur le bon d’intervention"
          />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text name={`products[${index}].noteInterne`} label="Note interne (boutique)" />
        </Grid>
        <Grid xs={12} md={4}>
          <Button
            fullWidth
            startIcon={<Iconify icon="mdi:lock-pattern" />}
            color="primary"
            variant="contained"
            size="large"
            onClick={()=>openPad.onTrue()}
          >
            Schema de verouillage
          </Button>
        </Grid>
        <Grid xs={12} md={4}>
          <Field.DatePicker name={`products[${index}].dateRestitution`} />
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Autocomplete
            sx={{ width: '100%' }}
            label="Technicien"
            name={`products[${index}].technicien`}
            autoHighlight
            options={Techniciens.map((option) => option)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
          />
        </Grid>
        <Divider sx={{ my: 1, width: '100%' }} />
        <Grid xs={12}>
            <PieceFormRepeater index={index}/>
        </Grid>
        <Divider sx={{ my: 1, width: '100%' }} />
        <Grid xs={12}>
            <OeuvreFormRepeater index={index}/>
        </Grid>
      </Grid>
      <RapportPanneModal index={index} open={openRapport.value} onClose={openRapport.onFalse}/>
      <LockPadModal index={index} open={openPad.value} onClose={openPad.onFalse}/>
      <MarqueAddModal open={openAddMarque.value} onClose={openAddMarque.onFalse}/>
      <ModeleAddModal open={openAddModele.value} onClose={openAddModele.onFalse}/>
    </>
  );
}
