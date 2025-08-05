import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Dialog, MenuItem, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import { Screen_Issues } from 'src/_mock/_rep';

import { Field } from 'src/components/hook-form';

export default function RapportPanneModal({ open, onClose }) {
  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>RAPPORT DE PRISE EN CHARGE DU MATERIEL VISIBLE PAR LE CLIENT</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1} p={1}>
          <Grid xs={6}>
            <Field.Select name="article.rapport.items.ecran" label="Écran">
              <MenuItem>Rien à signaler</MenuItem>
              {Screen_Issues.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid xs={6}>
            <Field.Select name="article.rapport.items.arrier" label="Arrière">
              <MenuItem>Rien à signaler</MenuItem>
              {Screen_Issues.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>

          <Grid>
            <Field.Checkbox name="article.rapport.items.allumage" label="Allumage" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.charge" label="Charge" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.cameraAvant" label="Camera Avant" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.cameraArriere" label="Camera Arrère" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.reseau" label="Réseau" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.wifi" label="Wifi" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.micro" label="Micro" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.vibreur" label="Vibreur" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.ecouteur" label="Ecouteur" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.hautParleur" label="Haut parleur" />
          </Grid>
          <Grid>
            <Field.Checkbox
              name="article.rapport.items.capteurProximite"
              label="Capteur de proximité"
            />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.priseJack" label="Prise jack" />
          </Grid>
          <Grid>
            <Field.Checkbox
              name="article.rapport.items.tactile"
              label="Tactile ( clavier + Multi-touch )"
            />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.lecteur" label="Lecteur d'empreinte" />
          </Grid>
          <Grid>
            <Field.Checkbox name="article.rapport.items.choc" label="Choc châssis" />
          </Grid>
          <Grid>
            <Field.Checkbox
              name="article.rapport.items.teste"
              label="Teste impossible le produit ne s’allume pas"
            />
          </Grid>
          <Grid xs={12}>
            <Field.Text name="article.rapport.observation" label="Observation" multiline rows={4} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
