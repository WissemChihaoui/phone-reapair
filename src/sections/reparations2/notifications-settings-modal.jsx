import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { _etat } from 'src/_mock/_rep';
import { Field } from 'src/components/hook-form';

export default function NotificationsSettingsModal({ open, onClose }) {
  // const { control, setValue, watch } = useFormContext();

  return (
    <Dialog maxWidth="lg" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Paramètres </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Typography>Notifications :</Typography>
            <Field.Checkbox label="Email" name="settings.notifications.email" />
            <Field.Checkbox label="SMS" name="settings.notifications.sms" />
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Etat :</Typography>
            <Field.Select name="settings.etat">
              <MenuItem value="none">No Value</MenuItem>
              <MenuItem value="none">No Value</MenuItem>
              {_etat.map((etat) => (
                <MenuItem key={etat.value} value={etat.value}>
                  {etat.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Casier de rangement :</Typography>
            <Field.Select name="settings.casier">
              <MenuItem value="none">No Value</MenuItem>
            </Field.Select>
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Checkbox name="settings.isMateriel" label="Matériel de prêt" />
            <Field.Text name="settings.materiel" label="Matériel" />
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Délai de reparation :</Typography>
            <Field.Select name="settings.delai">
              <MenuItem value="none">No Value</MenuItem>
              <Divider/>
              <MenuItem value="24">24 h</MenuItem>
              <MenuItem value="48">48 h</MenuItem>
              <MenuItem value="72">72 h</MenuItem>
              <MenuItem value="24">96 h</MenuItem>
            </Field.Select>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Validité du devis :</Typography>
            <Field.Select name="settings.validity">
              <MenuItem value="none">No Value</MenuItem>
              <Divider />
              <MenuItem value="1">1 mois</MenuItem>
              <MenuItem value="2">2 mois</MenuItem>
              <MenuItem value="3">3 mois</MenuItem>
            </Field.Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose()}>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
